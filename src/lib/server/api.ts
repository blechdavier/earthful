import { z } from "zod";
// import synchronous fs
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dev } from "$app/environment";

let total_pages: number | undefined;

const DISK_CACHE = dev;
const ENTRIES_PER_PAGE = 50000;

export let pages: { [key: number]: PageAndTimestamp } = {}; // honestly, this should be a Map, but I'm lazy, or honestly maybe just an array

// FIXME test for if the api fails and handle that properly instead of just hoping it goes away

type PageAndTimestamp = {
    page: number,
    timestamp: number,
    data: ApiItem[]
}

export type ApiItem = z.infer<typeof apiItem>;

const apiItem = z.object({
    // list_name: z.string(),
    master_item_name: z.string(),
    master_material: z.string(),
    // item_id: z.preprocess(
    //     Number,
    //     z.number()
    // ),
    // itemname: z.string(),
    // material: z.string(),
    quantity: z.string().transform(Number),
    // description: z.string().nullable(),
    latitude: z.string().transform(Number),
    longitude: z.string().transform(Number),
    // altitude: z.preprocess(
    //     Number,
    //     z.number()
    // ),
    // radius: z.preprocess(
    //     Number,
    //     z.number()
    // ),
    // location: z.string(),
    timestamp: z.string().transform((fakeDateString) => {
        // Format of the bad date string is yyyymmddhhmmss
        // We need to convert it to yyyy-mm-dd hh:mm:ss
        let year = fakeDateString.slice(0, 4);
        let month = fakeDateString.slice(4, 6);
        let day = fakeDateString.slice(6, 8);
        let hour = fakeDateString.slice(8, 10);
        let minute = fakeDateString.slice(10, 12);
        let second = fakeDateString.slice(12, 14);
        return new Date(`${year}-${month}-${day} ${hour}:${minute}:${second}`).getTime();
    }),
    project_name: z.string().nullable(),
    // project_id: z.preprocess(
    //     Number,
    //     z.number()
    // ).nullable(),
    username: z.string().nullable(),
    // manual_upload: z.preprocess(
    //     Boolean,
    //     z.boolean()
    // ).nullable(),
    // event_name: z.string().nullable(),
    // id: z.preprocess(
    //     Number,
    //     z.number()
    // ),
    // log_index: z.preprocess(
    //     Number,
    //     z.number()
    // )
});
const apiSchema = z.array(apiItem)


async function fetchApiPage(page: number): Promise<ApiItem[]> {
    if (page !== Math.round(page)) return [];
    if (page <= 0) return [];
    console.log(`fetching page ${page}`);
    try {
        let response = await fetch(
            `https://marinedebris.engr.uga.edu/mdtapp/sendAllItemInstances.php?page=${page}&page_size=${ENTRIES_PER_PAGE}&from=1950-05-03&to=3000-01-01`
        );
        console.log(`fetched page ${page}, parsing`);
        let result = await response.json();
        let parsed = apiSchema.parse(result.data);
        pages[page] = {
            page: page,
            timestamp: Date.now(),
            data: parsed
        }
        if (pages[page].data.length < ENTRIES_PER_PAGE) {
            total_pages = page;
        }
        console.log(`parsed page ${page}, got ${pages[page].data.length} results`);
        if (DISK_CACHE) {
            console.log(`caching ${pages[page].data.length} items to disk`);
            writeFileSync(`./api_cache/${page}.json`, JSON.stringify(pages[page]));
        }
        console.log("done");
        return parsed;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function startApiPageInterval() {
    if (DISK_CACHE) {
        console.log("Loading API cache from disk");
        if (!existsSync("./api_cache")) {
            mkdirSync("./api_cache");
        }
        let files = readdirSync("./api_cache");
        let highestPage = 0;
        for (const file of files) {
            let filePage = Number(file.replace(".json", ""));
            let fileContents = readFileSync(`./api_cache/${filePage}.json`, "utf-8");
            pages[filePage] = {
                page: filePage,
                timestamp: -1, // we don't know when this was cached, so we'll just assume it's ancient
                data: JSON.parse(fileContents).data as ApiItem[]
            };
            if (filePage > highestPage) {
                highestPage = filePage;
            }
        }
        // skip this if there is no API cache found
        if (highestPage > 0) {
            // see if the highest page is the last page
            const length = pages[highestPage].data.length;
            console.log(`Last page was ${length} entries, checking if it's the last page`);
            // FIXME this code might break if there's a multiple of 50,000 entries in the database
            if (length < ENTRIES_PER_PAGE) {
                console.log(`Last page was ${length} entries, assuming this is the last page, and setting total_pages to ${Object.keys(pages).length}`)
                total_pages = highestPage;
            }
        }
        console.log("Loaded API cache from disk");
    }


    console.log("Scraping API pages to fill cache");

    // Fetch pages until we have all of them
    // this is only one pass and errors are ignored, so it's not perfect
    let page = 1;
    while (total_pages === undefined || Object.keys(pages).length < total_pages) {
        if (!pages.hasOwnProperty(page)) {
            await fetchApiPage(page);
        }
        page++;
    }
    console.log("Cache full, starting interval");

    // Then, every 5 minutes, fetch the oldest page
    setInterval(async () => {
        let oldestPage = 1;
        let oldestTimestamp = Date.now();
        for (const page in pages) {
            if (pages[page].timestamp < oldestTimestamp) {
                oldestPage = Number(page);
                oldestTimestamp = pages[page].timestamp;
            }
        }
        console.log(`Oldest page was ${oldestPage}, freshening it up (total pages: ${total_pages})`)
        await fetchApiPage(oldestPage);
    }, 1000 * 60 * 5);
}

export function getApiItems(lte: Date, gte: Date): ApiItem[] {
    console.log(`getting items between ${gte} and ${lte}`)
    console.log(`there are ${Object.keys(pages).length} pages`)
    const gteTimestamp = gte.getTime();
    const lteTimestamp = lte.getTime();
    console.log(`getting items between ${gteTimestamp} and ${lteTimestamp}`)
    let result: ApiItem[] = [];
    for (const page in pages) {
        for (const item of pages[page].data) {
            if (item.timestamp >= gteTimestamp && item.timestamp <= lteTimestamp) {
                result.push(item);
            }
        }
    }
    return result;
}