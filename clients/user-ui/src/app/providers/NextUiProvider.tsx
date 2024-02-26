// app/providers.tsx
'use client'

import { grapgqlClient } from '@/src/graphql/gql.setup'
import { ApolloProvider } from '@apollo/client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvide } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ApolloProvider client={grapgqlClient}>
            <NextUIProvider>
                <NextThemesProvide attribute='class' defaultTheme='dark'>
                    {children}
                </NextThemesProvide>
            </NextUIProvider>
        </ApolloProvider>
    )
}