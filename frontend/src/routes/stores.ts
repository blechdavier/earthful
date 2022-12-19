import { writable, type Writable } from "svelte/store";
import type { User } from "./user";

export const userStore: Writable<null | User> = writable(null);