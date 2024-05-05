'use client';

import Logo from '@/assets/logo.png';
import { AssociatedWalletView } from './AssociatedWalletView';
import { Button } from '@/components/ui/button';

import { useHandleConnection } from '@/hooks/useHandleConnection';
import { useWallet } from '@/store';
import { DashboardIcon } from '@radix-ui/react-icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useAccount } from 'wagmi';

type Props = {
    type?: 'connect' | 'open';
};

export const Navbar = ({ type = 'open' }: Props): ReactNode => {
    const wallet = useWallet();
    const { isConnected } = useAccount();

    const handleConnection = useHandleConnection({
        runOnMount: false,
    });

    return (
        <div className="container flex flex-row align-center justify-between pt-4 pb-4">
            <Image src={Logo} alt="Spread Icon" className="w-[100px]" />
            {type === 'connect' ? (
                <div className="flex space-x-4">
                    {isConnected && (
                        <>
                            {wallet != null ? (
                                <AssociatedWalletView wallet={wallet} />
                            ) : (
                                <Button size="lg" onClick={handleConnection}>
                                    Connect Spread Wallet
                                </Button>
                            )}
                        </>
                    )}
                    <ConnectButton accountStatus="address" />
                </div>
            ) : (
                <a href="/connect">
                    <Button size="lg">
                        <DashboardIcon className="mr-1" /> Launch App
                    </Button>
                </a>
            )}
        </div>
    );
};
