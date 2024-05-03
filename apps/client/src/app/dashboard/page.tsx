'use client';

import { SpreadCandleStickGraph } from '@/app/dashboard/candleGraph';
import { SpreadMeanGraph } from '@/app/dashboard/meanGraph';
import { Navbar } from '@/components/navbar';
import { TokenSelect } from '@/components/token-select';
import { Card, CardHeader } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useMarketDataQuery } from '@/queries';
import { useTokenPair, useWallet } from '@/store';
import { MarketData } from '@/types';
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
                    <div className="mt-auto">
                        <SpreadCandleStickGraph />
                    </div>
                </div>
                <div className="col-span-6 flex flex-col min-h-[90vh]  w-[100%] h-[100%]">
                    <div className="mt-auto">
                        <SpreadMeanGraph />
                    </div>
                </div>
            </div>
        </>
    );
}

const MarketDataTable = ({ marketData }: { marketData: MarketData }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Spot Price</TableHead>
                    <TableHead>Futures Price </TableHead>
                    <TableHead className="text-right">Spot Best Bid</TableHead>
                    <TableHead className="text-right">
                        Futures Best Bid
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">
                        {marketData.spotPrice}$
                    </TableCell>
                    <TableCell>{marketData.futuresPrice}$</TableCell>
                    <TableCell>{marketData.bestBidPrice}$</TableCell>
                    <TableCell>{marketData.futuresBestBidPrice}$</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Spread</TableCell>
                    <TableCell className="text-right">
                        {marketData.spread}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};
