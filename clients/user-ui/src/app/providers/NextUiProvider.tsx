// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvide } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvide attribute='class' defaultTheme='dark'>
                {children}
            </NextThemesProvide>
        </NextUIProvider>
    )
}