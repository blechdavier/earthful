import type { Actions } from './$types';
import { prisma } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ cookies, request }) => {
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
            return fail(400, {message: 'Invalid form data'})
        }

        // create new post
        try {
            let test = await prisma.debrisLocationPost.create({
                data: {
                    latitude: latitude_num,
                    longitude: longitude_num,
                    debrisType: debrisType_num,
                }
            })
            console.log(test);
        } catch (err) {
            console.error(err)
            return fail(500, {message: 'Could not create the data point'})
        }
        return {
            status: 201,
        }
    }
}