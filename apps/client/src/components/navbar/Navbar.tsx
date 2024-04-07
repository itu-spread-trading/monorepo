'use client';

import Logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { formatAddress } from '@ituspreadtrading/sdk';
import { DashboardIcon, PersonIcon } from '@radix-ui/react-icons';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useAccount } from 'wagmi';

type Props = {
    type?: 'connect' | 'open';
};

export const Navbar = ({ type = 'open' }: Props): ReactNode => {
    const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount();

    return (
        <div className="container flex flex-row align-center justify-between pt-4 pb-4">
            <Image src={Logo} alt="Spread Icon" className="w-[100px]" />
            {isConnected ? (
                <Button
                    onClick={() => {
                        open();
                    }}
                    size="lg"
                >
                    <PersonIcon className="mr-1" />
                    {formatAddress(address)}
                </Button>
            ) : type === 'connect' ? (
                <Button
                    onClick={() => {
                        open();
                    }}
                    size="lg"
                >
                    <PersonIcon className="mr-1" /> Connect Wallet
                </Button>
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
