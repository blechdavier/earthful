import type { Actions, PageServerLoad } from "../create/$types";
import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string({ required_error: "Name is required." }).min(1, { message: "Name is required." }).max(1024, { message: "Name may be no longer than 1024 characters." }).trim(),
    email: z.string({ required_error: "Email is required." }).min(1, { message: "Email is required." }).max(1024, { message: "Email may be no longer than 1024 characters." }).email({ message: "Invalid email address." }),
    password: z.string({ required_error: "Password is required." }).min(1, { message: "Password is required." }).min(6, { message: "Password must be at least 6 characters." }).max(1024, { message: "Password may be no longer than 1024 characters." })
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
            // if there's an error validating the user input, pass back the valid fields to the client dso the form can be repopulated with the vales that are correct.
            // also pass back the errors so the client can display them
            // this is sent to +page.svelte as the form
            if (err instanceof z.ZodError) {
                const { fieldErrors: errors } = err.flatten()
                return {
                    data: { name, email },
                    errors
                }
            }
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
        // log in the user
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