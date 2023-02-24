import type { PageServerLoad } from './$types'
import { prisma } from '$lib/server/prisma'

// export const load: PageServerLoad = async () => {
//     return {
//         dataPoints: (await prisma.debrisLocationPost.findMany()).map(
//             dataPoint => {
//                 const { latitude, longitude, debrisType, id } = dataPoint
//                 return { latitude, longitude, debrisType, id }
//             }
//         )
//     }
// }