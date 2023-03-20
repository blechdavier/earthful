import { getLeaderboard } from "$lib/server/leaderboard"

export async function load() {
    const leaderboard = await getLeaderboard(Infinity, 0);
    return leaderboard;
}