'use client';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';

import { clsnm } from '@/utils';
import { Inter as FontSans } from 'next/font/google';
import { ReactNode } from 'react';
import { Web3Provider } from '@/context';
import { RecoilRoot } from 'recoil';

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
            </body>
        </html>
    );
}
