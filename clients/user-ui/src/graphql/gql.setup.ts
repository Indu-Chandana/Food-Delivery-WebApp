import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client"
import Cookies from "js-cookie"

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URI
})

// we need to add few things into request header
const authMiddleware = new ApolloLink((oparetion, forward) => {
    oparetion.setContext({
        headers: {
            accessToken: Cookies.get("access_token"),
            refreshToken: Cookies.get("refresh_token"),
        }
    })
    return forward(oparetion)
})

export const grapgqlClient = new ApolloClient({
    // uri: process.env.NEXT_PUBLIC_SERVER_URI, // now we are using -authMiddleware- because now we are using 'httpLink'
    link: authMiddleware.concat(httpLink),
    cache: new InMemoryCache(),
})