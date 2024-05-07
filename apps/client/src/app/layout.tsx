'use client';

import { Toaster } from '@/components/ui/toaster';
import { Web3Provider } from '@/context';
import { clsnm } from '@/utils';
import '@rainbow-me/rainbowkit/styles.css';
import { Inter as FontSans } from 'next/font/google';
import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

import './globals.css';

export const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

type Props = Readonly<{
    children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props): ReactNode {
    return (
        <html lang="en">
            <title>Spread</title>
            <meta
                name="description"
                content="Seamless way to interact with blockchain assets for
                spread trading"
            />
            <body
                className={clsnm(
                    'min-h-screen dark bg-background font-sans antialiased',
                    fontSans.variable,
                )}
            >
                <RecoilRoot>
                    <Web3Provider>{children}</Web3Provider>
                </RecoilRoot>
                <Toaster />
            </body>
        </html>
    );
}
