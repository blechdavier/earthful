export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')
        console.log("signing up with credentials:")
        console.log("email: " + email)
        console.log("password: " + password)
    }
}