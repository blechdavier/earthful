import type { Actions, PageServerLoad } from "../create/$types";
import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";


export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validate()
    if (session) {
        throw redirect(302, '/')
    }
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { name, email, password } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>

        // FIXME URGENT - validate input

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