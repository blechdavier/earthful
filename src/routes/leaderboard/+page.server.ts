import { getLeaderboard } from "$lib/server/leaderboard"

export async function load() {
    const leaderboard = await getLeaderboard(3, 3);
    console.log(leaderboard);
    return leaderboard;
}