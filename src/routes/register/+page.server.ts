import type { Actions, PageServerLoad } from "../create/$types";
import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(1).max(64).trim(),
    email: z.string().min(1).max(64).email(),
    password: z.string().min(8).max(1024),
})


export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validate()
    if (session) {
        throw redirect(302, '/')
    }
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        let { name, email, password } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>

        // validate the data using zod
        try {
            registerSchema.parse({
                name,
                email,
                password
            })
        } catch (err) {
            console.error(err)
            return fail(400, { message: 'Invalid data' })
        }

        // create the user
        try {
            await auth.createUser({
                // the "key" that is used to log in
                key: {
                    providerId: 'email',
                    providerUserId: email,
                    password
                },
                // the user's non-key attributes
                attributes: {
                    name,
                }
            })
        } catch (err) {
            console.error(err)
            return fail(400, { message: 'Could not register user' })
        }
        try {
            // log in (see ../login/+page.server.ts)
            const key = await auth.validateKeyPassword("email", email, password)
            const session = await auth.createSession(key.userId)
            locals.setSession(session)
        }
        catch (err) {
            // if it can't log in, go to the login page
            console.error(err)
            return redirect(302, '/login')
        }
    }
};