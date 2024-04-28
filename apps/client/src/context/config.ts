import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc } from 'wagmi/chains';

export const projectId =
    process.env.NEXT_PUBLIC_PROJECT_ID ?? '624604638f4bcb1eb3267fc96a0a77d1';

if (!projectId) throw new Error('Project ID is not defined');

// Create wagmiConfig
const chains = [bsc] as const;

export const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains,
    ssr: true,
});
