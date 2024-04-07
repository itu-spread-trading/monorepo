import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { bsc } from 'wagmi/chains';

export const projectId =
    process.env.NEXT_PUBLIC_PROJECT_ID ?? '624604638f4bcb1eb3267fc96a0a77d1';

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
    name: 'Spread',
    description: 'ITU Spread Trading Client Application',
    url: 'https://ituspreadtrading.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// Create wagmiConfig
const chains = [bsc] as const;
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
});
