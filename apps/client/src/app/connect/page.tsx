'use client';

import WallpaperImage from '@/assets/connect-wallpaper.png';
import Logo from '@/assets/logo.png';
import { Button } from '@/components';
import { formatAddress } from '@ituspreadtrading/sdk';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function ConnectPage(): ReactNode {
    const { open } = useWeb3Modal();
    const router = useRouter();
    const { isConnected, address, isConnecting, isReconnecting } = useAccount();

    useEffect(() => {
        // Navigate to dashboard if already connected
        if (isConnected) {
            router.push('/dashboard');
        }
    }, [isConnected]);

    return (
        <div
            className="flex h-screen"
            style={{
                backgroundImage: `url(${WallpaperImage.src})`,
                backgroundSize: 'cover',
            }}
        >
            <div className="flex flex-col w-[400px] m-auto">
                <Image
                    className="w-[80%] m-auto mb-4 h-full"
                    alt="Spread Logo"
                    src={Logo}
                />

                <Button
                    loading={isConnecting || isReconnecting}
                    size="lg"
                    onClick={() => {
                        if (!isConnected) {
                            open();
                        }
                    }}
                >
                    {isConnected
                        ? `Connected as ${formatAddress(address)}`
                        : 'Connect'}
                </Button>
            </div>
        </div>
    );
}
