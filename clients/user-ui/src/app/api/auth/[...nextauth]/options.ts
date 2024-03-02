
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOLE_CLIENT_SECRET || "",
        }),
        // ...add more providers here
    ],
    secret: process.env.NEXT_AUTH_SECRET,
}
