export const load = async ({ fetch }) => {
    const res = await fetch('https://dummyjson.com/posts')
    const posts = await res.json()
    return posts
}