import type { PageServerLoad } from "./$types"
import { prisma } from '$lib/server/prisma'

export const load: PageServerLoad = async ({ fetch }) => {
    return {
        dataPoints: await prisma.dataPoint.findMany(),
    }
}