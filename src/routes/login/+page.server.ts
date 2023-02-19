import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";

const registerSchema = z.object({
    email: z.string({ required_error: "Email is required." }).min(1, { message: "Email is required." }).max(1024, { message: "Email may be no longer than 1024 characters." }).email({ message: "Invalid email address." }),
    password: z.string({ required_error: "Password is required." }).min(1, { message: "Password is required" }).max(1024, { message: "Password may be no longer than 1024 characters." })
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
        } catch (err) {
            if (err instanceof z.ZodError) {
                const { fieldErrors: errors } = err.flatten()
                return fail(400, {
                    data: { email },
                    errors
                })
            } else {
                throw err
            }
        }

        try {
            // validate credentials and make a session
            const key = await auth.validateKeyPassword("email", email, password)
            const session = await auth.createSession(key.userId)
            // set the session cookie
            locals.setSession(session)
        } catch (err) {
            console.error(err)
            return fail(400, {
                data: {
                    email,
                },
                errors: {
                    email: [],
                    password: ["Invalid email or password."]
                }
            })
        }
        throw redirect(302, '/')
    }
}