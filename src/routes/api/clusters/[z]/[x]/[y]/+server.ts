import type { RequestHandler } from '@sveltejs/kit'
import { getTileData } from '$lib/server/clusters'

export const GET: RequestHandler<{ x: string, y: string, z: string }> = async ({ params }) => {

    // not sure how to get params to be typed correctly so here's a bit of hand waving
    const x = parseFloat(params.x);
    const y = parseFloat(params.y);
    const z = parseInt(params.z);

    // find the cluster that contains the point
    return new Response(JSON.stringify(await getTileData(x, y, z)));

}