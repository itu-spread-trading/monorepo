'use client';

import { config, projectId } from '@/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import React, { ReactNode } from 'react';
import { State, WagmiProvider } from 'wagmi';

// Setup queryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

if (!projectId) throw new Error('Project ID is not defined');

// Create modal
createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
});

export default function Web3ModalProvider({
    children,
    initialState,
}: {
    children: ReactNode;
    initialState?: State;
}): ReactNode {
    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
