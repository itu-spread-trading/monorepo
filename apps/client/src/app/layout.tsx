import { config } from '@/context';
import Web3ModalProvider from '@/context/web3modal';
import { clsnm } from '@/utils';
import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { headers } from 'next/headers';
import { ReactNode } from 'react';
import { cookieToInitialState } from 'wagmi';

import './globals.css';

export const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: 'Spread',
    description:
        'Seamless way to interact with blockchain assets for spread trading',
};

type Props = Readonly<{
    children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props): ReactNode {
    return (
        <html lang="en">
            <body
                className={clsnm(
                    'min-h-screen dark bg-background font-sans antialiased',
                    fontSans.variable,
                )}
            >
                <Web3ModalProvider>{children}</Web3ModalProvider>
            </body>
        </html>
    );
}
