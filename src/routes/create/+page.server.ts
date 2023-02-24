import type { Actions } from './$types';
import { prisma } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const { user, session } = await locals.validateUser()
        if (!(user && session)) return fail(401, { message: 'You must be logged in to create a data point' })

        // get strings from form data
        const { lat, lng, debrisType } = Object.fromEntries(await request.formData()) as {
            lat: string
            lng: string
            debrisType: string
        }
        // convert to numbers and return error if invalid (there's probably a better way to do this)
        const latitude_num = parseFloat(lat)
        const longitude_num = parseFloat(lng)
        const debrisType_num = parseInt(debrisType)
        if (isNaN(latitude_num) || isNaN(longitude_num) || isNaN(debrisType_num)) {
            return fail(400, { message: 'Invalid form data' })
        }

        // create new post
        try {
            await prisma.debrisLocationPost.create({
                data: {
                    latitude: latitude_num,
                    longitude: longitude_num,
                    debrisType: debrisType_num,
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            })

            // as a test, create 1000 posts at random locations
            // for (let i = 0; i < 1000; i++) {
            //     await prisma.debrisLocationPost.create({
            //         data: {
            //             latitude: Math.random() * 180 - 90,
            //             longitude: Math.random() * 360 - 180,
            //             debrisType: Math.floor(Math.random() * 3),
            //             user: {
            //                 connect: {
            //                     id: user.id
            //                 }
            //             }
            //         }
            //     })
            // }
        } catch (err) {
            console.error(err)
            return fail(500, { message: 'Could not create the data point' })
        }
        return {
            status: 201,
        }
    }
}