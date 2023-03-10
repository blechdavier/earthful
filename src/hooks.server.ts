import { auth } from "$lib/server/lucia";
import { startApiPageInterval } from "$lib/server/api";
import { handleHooks } from "@lucia-auth/sveltekit";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = handleHooks(auth) // make sure the lucia is first.

// start fetching API pages every so often. This is to keep a cache of the API data
startApiPageInterval()