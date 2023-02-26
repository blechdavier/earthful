import { prisma } from '$lib/server/prisma'
import type { Actions } from '@sveltejs/kit'

export const actions: Actions = {
    default: async ({ request }) => {
        console.log(await request.formData)
        return prisma.debrisLocationPost.findMany({
            select: {
                debrisType: true,
                latitude: true,
                longitude: true
            },
            where: {
                // TODO filters
            }
        });
    }
}