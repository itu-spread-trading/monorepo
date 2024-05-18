'use client';

import { DashboardChart } from '@/app/dashboard/chart';
import { SellAndBuyInput } from '@/app/dashboard/input';
import { BalanceTable, MarketDataTable } from '@/app/dashboard/marketdata';
import { DashboardOrderHistory } from '@/app/dashboard/orderhistory';
import { Card, CardHeader, Navbar, TokenSelect } from '@/components';
import { MarketDataProvider } from '@/context';
import { useMarketDataQuery, useTokenPairQuery } from '@/queries';
import { useTokenPair, useWallet } from '@/store';
import { getDefaultConfig, spreadSDK } from '@/utils';
import { ReactNode, useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function DashboardPage(): ReactNode {
    const { isConnected } = useAccount();
    const wallet = useWallet();
    const tokenPair = useTokenPair();

    useTokenPairQuery({
        symbol: tokenPair,
    });

    const { data: marketData } = useMarketDataQuery({
        symbol: tokenPair,
    });

    useEffect(() => {
        if (isConnected && wallet != null) {
            spreadSDK.init(
                getDefaultConfig({
                    publicAddress: wallet.associatedAddress,
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
                    <div className="col-span-6 flex flex-col max-h-[85vh] w-[100%] h-[100%]">
                        <Card>
                            <CardHeader>
                                <TokenSelect />
                            </CardHeader>
                        </Card>
                        <Card className="mt-2">
                            <MarketDataTable marketData={marketData} />
                            <div className="h-4"></div>
                            <BalanceTable />
                        </Card>
                        <div className="mt-auto">
                            <DashboardChart />
                        </div>
                    </div>
                    <div className="col-span-6 flex flex-col max-h-[85vh] w-[100%] h-[100%]">
                        <SellAndBuyInput />
                        <DashboardOrderHistory />
                    </div>
                </div>
            </MarketDataProvider>
        </>
    );
}
