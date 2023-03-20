import { getLeaderboard } from "$lib/server/leaderboard"

export async function load() {
    const leaderboard = await getLeaderboard(0, Infinity);
    return leaderboard;
}