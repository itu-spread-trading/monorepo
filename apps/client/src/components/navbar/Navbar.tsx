'use client';

import Logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { DashboardIcon } from '@radix-ui/react-icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { ReactNode } from 'react';

type Props = {
    type?: 'connect' | 'open';
};

export const Navbar = ({ type = 'open' }: Props): ReactNode => {
    return (
        <div className="container flex flex-row align-center justify-between pt-4 pb-4">
            <Image src={Logo} alt="Spread Icon" className="w-[100px]" />
            {type === 'connect' ? (
                <ConnectButton accountStatus="address" />
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
