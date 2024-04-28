'use client';

import WallpaperImage from '@/assets/login.png';
import Logo from '@/assets/logo.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function ConnectPage(): ReactNode {
    const router = useRouter();
    const { isConnected } = useAccount();

    useEffect(() => {
        // Navigate to dashboard if already connected
        if (isConnected) {
            router.push('/dashboard');
        }
    }, [isConnected]);

    return (
        <div
            className="h-screen w-screen grid grid-cols-2"
            style={{
                backgroundSize: 'cover',
            }}
        >
            <div className="h-screen w-full relative">
                <Image
                    layout="fill"
                    objectFit="cover"
                    alt="Spread Wallpaper"
                    className="h-full w-full"
                    src={WallpaperImage}
                />
            </div>
            <div className="flex flex-col m-auto">
                <Image
                    className="w-[80%] m-auto mb-4 h-full"
                    alt="Spread Logo"
                    src={Logo}
                />

                <ConnectButton />
            </div>
        </div>
    );
}
