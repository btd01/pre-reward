import { Providers } from "@/Providers"

import "@/styles/globals.css"

import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import React from "react"

export const metadata: Metadata = {
    title: "BetterThanDollar",
    description: `The BetterThanDollar project is a Next.js application aimed at enhancing user engagement through a rewards program. Key features include a dynamic countdown timer, a responsive layout, and integration with various components like a navigation bar and rewards display. The project utilizes TypeScript for type safety and includes a robust design for improved user experience.`
}

export default async function RootLayout({
    children,
    params: { locale }
}: Readonly<{
    children: React.ReactNode
    params: { locale: string }
}>) {
    const messages = await getMessages()
    return (
        <html lang={locale}>
            <head>
                <link rel="icon" href="/favicon.jpeg" />
            </head>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <Providers>{children}</Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
