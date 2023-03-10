import { z } from "zod";
// import synchronous fs
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs'

let total_pages: number | undefined;

const DISK_CACHE = true;
const ENTRIES_PER_PAGE = 50000;

export let pages: { [key: number]: PageAndTimestamp } = {}; // honestly, this should be a Map, but I'm lazy, or honestly maybe just an array

// FIXME test for if the api fails and handle that properly instead of just hoping it goes away

type PageAndTimestamp = {
    page: number,
    timestamp: number,
    data: ApiItem[]
}

type ApiItem = z.infer<typeof apiItem>;

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
    quantity: z.preprocess(
        Number,
        z.number()
    ),
    // description: z.string().nullable(),
    latitude: z.preprocess(
        Number,
        z.number()
    ),
    longitude: z.preprocess(
        Number,
        z.number()
    ),
    // altitude: z.preprocess(
    //     Number,
    //     z.number()
    // ),
    // radius: z.preprocess(
    //     Number,
    //     z.number()
    // ),
    // location: z.string(),
    timestamp: z.preprocess(
        Number,
        z.number()
    ),
    // project_name: z.string().nullable(),
    // project_id: z.preprocess(
    //     Number,
    //     z.number()
    // ).nullable(),
    // username: z.string().nullable(),
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
        let parsed: ApiItem[] = apiSchema.parse(result.data);
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
            console.log("caching to disk");
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
            await mkdirSync("./api_cache");
        }
        let files = await readdirSync("./api_cache");
        for (const file of files) {
            let filePage = Number(file.replace(".json", ""));
            let fileContents = await readFileSync(`./api_cache/${filePage}.json`, "utf-8");
            pages[filePage] = {
                page: filePage,
                timestamp: -1, // we don't know when this was cached, so we'll just assume it's ancient
                data: apiSchema.parse(JSON.parse(fileContents).data)
            };
        }
        // skip this if there is no API cache found
        if (Object.keys(pages).length > 0) {
            // see if the highest page is the last page
            const length = pages[Object.keys(pages).length].data.length;
            console.log(`Last page was ${length} entries`);
            if (length < ENTRIES_PER_PAGE) {
                console.log(`Last page was ${length} entries, assuming this is the last page, and setting total_pages to ${Object.keys(pages).length}`)
                total_pages = Object.keys(pages).length;
            }
        }
        console.log("Loaded API cache from disk");
    }


    console.log("Scraping API pages to fill cache");

    // Fetch pages until we have all of them at least to some degree
    let page = 1;
    while (total_pages === undefined || Object.keys(pages).length < total_pages) {
        await fetchApiPage(page);
        page++;
    }
    console.log("Cache full, starting interval");

    // Then, every minute, fetch the oldest page
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