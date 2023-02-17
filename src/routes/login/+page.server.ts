import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(1).max(64).trim(),
    email: z.string().min(1).max(64).email(),
    password: z.string().min(8).max(1024),
})

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validate()
    if (session) throw redirect(302, '/')
}

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { email, password } = await Object.fromEntries(
            await request.formData()
        ) as Record<string, string>

        // validate the data using zod
        try {
            registerSchema.parse({
                email,
                password
            })
        } catch {
            return fail(400, { message: "Invalid data" })
        }

        try {
            // validate credentials and make a session
            const key = await auth.validateKeyPassword("email", email, password)
            const session = await auth.createSession(key.userId)
            // set the session cookie
            locals.setSession(session)
        } catch (err) {
            console.error(err)
            return fail(400, { message: "Could not login user." })
        }
        throw redirect(302, '/')
    }
}