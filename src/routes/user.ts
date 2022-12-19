export class User {
    username: string;
    email: string;
    picture: string;
    posts: number[];

    constructor(username: string) {
        console.log("creating user", username)
        this.username = username;
        //pretend to fetch user data from database
        this.email = "user@example.com";
        this.picture = "https://avatars.githubusercontent.com/u/107078148?v=4";
        this.posts = [];
    }

}