import { getApiItems } from "./api";
import rbush from "rbush";
import type RBush from "rbush";

let apiItems = getApiItems(new Date(), new Date(0));

interface RBushItem {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    quantity: number;
}

// use rbush to index the points,
// make a cache of hierarchical clusters
const startTime = Date.now();
let cache: RBush<RBushItem>[] = [];

cache[0] = new rbush(9);

cache[0].load(apiItems.map((item) => {
    return {
        minX: item.longitude,
        minY: item.latitude,
        maxX: item.longitude,
        maxY: item.latitude,
        quantity: item.quantity,
        clustered: false,
    };
}));

console.log(`rbush took ${Date.now() - startTime}ms to index ${apiItems.length} items`);


/*

source: https://blog.mapbox.com/clustering-millions-of-points-on-a-map-with-supercluster-272046ec5c97

A simple and efficient way to group points into clusters for a specific zoom
is called greedy clustering. It works like this:

Start with any point from the dataset.
Find all points within a certain radius around that point.
Form a new cluster with the nearby points.
Choose a new point that isn’t part of a cluster, and repeat until we have visited all the points.
*/

function cluster(input: RBush<RBushItem>, clusterRadius: number): RBush<RBushItem> {
    const startTime = Date.now();
    const output = new rbush(9);

    let visited = new Set<RBushItem>();

    let all = input.all();

    for (let i = 0; i < all.length; i++) {
        const item = all[i];
        if (visited.has(item)) {
            continue;
        }
        const nearby = input.search({
            minX: item.minX - clusterRadius,
            minY: item.minY - clusterRadius,
            maxX: item.minX + clusterRadius,
            maxY: item.minY + clusterRadius,
        });
        if (nearby.length === 1) {
            output.insert(item);
        } else {
            let totalQuantity = 0;
            let totalX = 0;
            let totalY = 0;
            let length = 0;
            for (let j = 0; j < nearby.length; j++) {
                const nearbyItem = nearby[j];
                if (visited.has(nearbyItem)) {
                    continue;
                }
                length++;
                visited.add(nearbyItem);
                totalQuantity += nearbyItem.quantity;
                totalX += nearbyItem.minX;

                totalY += nearbyItem.minY;
            }
            output.insert({
                minX: totalX / length,
                minY: totalY / length,
                maxX: totalX / length,
                maxY: totalY / length,
                quantity: totalQuantity,
            });
        }
    }

    console.log(`clustering took ${Date.now() - startTime}ms for ${input.all().length} items to ${output.all().length} items`)
    return output as RBush<RBushItem>;
}

let clusterRadius = 0.001;

for (let i = 1; i < 16; i++) {
    cache[i] = cluster(cache[i - 1], clusterRadius);
    clusterRadius *= 2.1; // slightly simplify the clustering as we zoom out
}

function getRBush(z: number) {
    return cache[cache.length - z - 1];
}


export function getTileData(x: number, y: number, z: number) {

    //as a test, sum up the quantities in the most zoomed out layer and print it out
    let total = getRBush(0).all().reduce((acc, item) => acc + item.quantity, 0);
    console.log(`total quantity in most zoomed out layer is ${total}`)

    const [lon1, lat1] = tileToLonLat(x, y, z);
    const [lon2, lat2] = tileToLonLat(x + 1, y + 1, z);

    if (z > cache.length) z = cache.length;

    const bbox = {
        minX: Math.min(lon1, lon2),
        minY: Math.min(lat1, lat2),
        maxX: Math.max(lon1, lon2),
        maxY: Math.max(lat1, lat2)
    };

    const result = getRBush(z).search(bbox);

    console.log(`this layer has a total of ${getRBush(z).all().length} clusters`)

    console.log(`searching for ${bbox.minX}, ${bbox.minY}, ${bbox.maxX}, ${bbox.maxY} found ${result.length} clusters`)

    if (result.length === 0) {
        return {
            type: "FeatureCollection",
            features: [],
        };
    }
    console.log(`first entry has coords ${result[0].minX}, ${result[0].minY} and quantity ${result[0].quantity}`)
    // GeoJSON FeatureCollection
    return {
        type: "FeatureCollection",
        features: result.map((item) => {
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [item.minX, item.minY],
                },
                properties: {
                    quantity: item.quantity,
                },
            };
        }),
    }
}

function tileToLonLat(x: number, y: number, z: number) {
    const n = 2 ** z;
    const lon = x / n * 360 - 180;
    const lat = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n))) * 180 / Math.PI;
    return [lon, lat]
}

function LonLatToTile(lon: number, lat: number, z: number) {
    const n = 2 ** z;
    const x = Math.floor((lon + 180) / 360 * n);
    const y = Math.floor((1 - Math.asinh(Math.tan(lat * Math.PI / 180)) / Math.PI) / 2 * n);
    return { x, y };
}