import { getApiItems, type ApiItem } from "./api";

export async function getLeaderboard(trackerCount: number, projectCount: number) {

    console.log("Loading leaderboard data");

    const items: ApiItem[] = getApiItems(new Date(), new Date(0));

    let trackers: Map<string, number> = new Map();
    let projects: Map<string, number> = new Map();

    for (let item of items) {
        if (item.username) {
            if (trackers.has(item.username)) {
                // @ts-ignore
                trackers.set(item.username, trackers.get(item.username) + item.quantity);
            } else {
                trackers.set(item.username, item.quantity);
            }
        }
        if (item.project_name) {
            if (item.project_name === "Default") continue; // ignore default project name
            if (projects.has(item.project_name)) {
                // @ts-ignore
                projects.set(item.project_name, projects.get(item.project_name) + item.quantity);
            } else {
                projects.set(item.project_name, item.quantity);
            }
        }
    }

    // get the top three trackers and projects
    let top_trackers: { username: string, score: number }[] = [];
    let top_projects: { name: string, score: number }[] = [];

    if (trackerCount !== 0) {
        for (let [username, score] of trackers) {
            if (top_trackers.length < trackerCount) {
                top_trackers.push({ username, score });
            } else {
                let lowest = top_trackers[0];
                for (let i = 1; i < top_trackers.length; i++) {
                    if (top_trackers[i].score < lowest.score) {
                        lowest = top_trackers[i];
                    }
                }
                if (score > lowest.score) {
                    top_trackers.splice(top_trackers.indexOf(lowest), 1);
                    top_trackers.push({ username, score });
                }
            }
        }
    }

    if (projectCount !== 0) {
        for (let [name, score] of projects) {
            if (top_projects.length < projectCount) {
                top_projects.push({ name, score });
            } else {
                let lowest = top_projects[0];
                for (let i = 1; i < top_projects.length; i++) {
                    if (top_projects[i].score < lowest.score) {
                        lowest = top_projects[i];
                    }
                }
                if (score > lowest.score) {
                    top_projects.splice(top_projects.indexOf(lowest), 1);
                    top_projects.push({ name, score });
                }
            }
        }
    }

    top_projects.sort((a, b) => b.score - a.score);
    top_trackers.sort((a, b) => b.score - a.score);

    // fix lowercase names
    for (const project of top_projects) {
        const words = project.name.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        project.name = words.join(" ");
    }

    for (const tracker of top_trackers) {
        const words = tracker.username.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        tracker.username = words.join(" ");
    }

    return {
        trackers: top_trackers,
        projects: top_projects
    };
}