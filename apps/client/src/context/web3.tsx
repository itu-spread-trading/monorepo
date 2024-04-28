'use client';

import { projectId } from '@/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';

// Setup queryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

if (!projectId) throw new Error('Project ID is not defined');

const config = getDefaultConfig({
    appName: 'Spread',
    projectId: projectId,
    chains: [bsc],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

export function Web3Provider({ children }: { children: ReactNode }): ReactNode {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
