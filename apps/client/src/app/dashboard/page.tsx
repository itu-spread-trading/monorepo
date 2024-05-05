'use client';

import { DashboardChart } from '@/app/dashboard/chart';
import { SellAndBuyInput } from '@/app/dashboard/input';
import { MarketDataTable } from '@/app/dashboard/marketdata';
import { Navbar, TokenSelect, Card, CardHeader } from '@/components';
import { MarketDataProvider } from '@/context';
import { useMarketDataQuery } from '@/queries';
import { useTokenPair, useWallet } from '@/store';
import { getDefaultConfig, spreadSDK } from '@/utils';
import { ReactNode, useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function DashboardPage(): ReactNode {
    const { isConnected } = useAccount();
    const wallet = useWallet();
    const tokenPair = useTokenPair();

    const { data: marketData } = useMarketDataQuery({
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
            <MarketDataProvider value={marketData}>
                <div className="grid container grid-cols-12 gap-6">
                    <div className="col-span-6 flex flex-col min-h-[90vh] w-[100%] h-[100%]">
                        <Card>
                            <CardHeader>
                                <TokenSelect />
                            </CardHeader>
                        </Card>
                        <Card className="mt-2">
                            <MarketDataTable marketData={marketData} />
                        </Card>
                    </div>
                    <div className="col-span-6 flex flex-col min-h-[90vh]  w-[100%] h-[100%]">
                        <SellAndBuyInput />
                        <div className="mt-auto">
                            <DashboardChart />
                        </div>
                    </div>
                </div>
            </MarketDataProvider>
        </>
    );
}
