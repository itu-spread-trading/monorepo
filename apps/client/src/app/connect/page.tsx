'use client';

import WallpaperImage from '@/assets/login.png';
import Logo from '@/assets/logo.png';
import { useHandleConnection } from '@/hooks/useHandleConnection';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function ConnectPage(): ReactNode {
    const router = useRouter();
    useHandleConnection({
        onConnect: () => {
            router.push('/dashboard');
        },
    });

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
            <div className="flex flex-col items-center m-auto">
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
