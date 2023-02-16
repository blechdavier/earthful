import { auth } from "$lib/server/lucia";
import type { RequestHandler } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals }) => {
    // Validate the session
    const session = await locals.validate()
    // If there is no session to log out, redirect to the home page
    if (!session) {
        throw redirect(302, "/")
    }
    // Invalidate the session
    await auth.invalidateSession(session.sessionId)
    // Clear the session cookie
    locals.setSession(null)
    // Redirect to the home page
    throw redirect(302, "/")
}