"use client"

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { cookieStorage, cookieToInitialState, createStorage, http } from "wagmi"

import "@rainbow-me/rainbowkit/styles.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { WagmiProvider } from "wagmi"
import { mainnet } from "wagmi/chains"

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!

const config = getDefaultConfig({
    appName: "BetterThanDollar",
    projectId: projectId,
    chains: [mainnet],
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
    transports: [mainnet].reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {})
})

const queryClient = new QueryClient()

interface ProvidersProps {
    children: ReactNode
    cookie?: string | null
}

export function Providers({ children, cookie }: ProvidersProps) {
    const initialState = cookieToInitialState(config, cookie)
    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider initialChain={config.chains[0]}>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
