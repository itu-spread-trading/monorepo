'use client';
import { projectId } from '@/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode, useEffect, useState } from 'react';
import { ResolvedRegister, WagmiProvider } from 'wagmi';
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

export function Web3Provider({ children }: { children: ReactNode }): ReactNode {
    const [config, setConfig] = useState<ResolvedRegister['config'] | null>(
        null,
    );

    useEffect(() => {
        if (config == null) {
            setConfig(
                getDefaultConfig({
                    appName: 'Spread',
                    projectId: projectId,
                    chains: [bsc],
                    ssr: false, // If your dApp uses server side rendering (SSR)
                }),
            );
        }
    }, [config]);

    if (config == null) {
        return null;
    }

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
