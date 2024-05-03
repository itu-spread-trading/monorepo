'use client';

import { SpreadCandleStickGraph } from '@/app/dashboard/candleGraph';
import { SpreadMeanGraph } from '@/app/dashboard/meanGraph';
import { Navbar } from '@/components/navbar';
import { TokenSelect } from '@/components/token-select';
import { Card, CardHeader } from '@/components/ui/card';
import { useMarketDataQuery } from '@/queries';
import { useTokenPair, useWallet } from '@/store';
import { getDefaultConfig, spreadSDK } from '@/utils';
import { ReactNode, useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function DashboardPage(): ReactNode {
    const { isConnected } = useAccount();
    const wallet = useWallet();
    const tokenPair = useTokenPair();

    const { data } = useMarketDataQuery({
        symbol: tokenPair,
    });

    useEffect(() => {
        if (isConnected && wallet != null) {
            spreadSDK.init(
                getDefaultConfig({
                    publicAddress: wallet.address,
                    privateKey: wallet.privateKey,
                }),
            );
        }
    }, [isConnected, wallet]);

    return (
        <>
            <Navbar type="connect" />
            <div className="grid container grid-cols-12 gap-6">
                <div className="col-span-5">
                    <Card>
                        <CardHeader>
                            <TokenSelect />
                        </CardHeader>
                    </Card>
                </div>
                <div className="col-span-7">
                    <SpreadCandleStickGraph />
                    <div className="h-2" />
                    <SpreadMeanGraph />
                </div>
            </div>
        </>
    );
}
