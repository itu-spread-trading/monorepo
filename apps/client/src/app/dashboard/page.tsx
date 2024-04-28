'use client';

import { SpreadCandleStickGraph } from '@/app/dashboard/candleGraph';
import { SpreadMeanGraph } from '@/app/dashboard/meanGraph';
import { Navbar } from '@/components/navbar';
import { useSpreadGraphQuery, useSpreadMeanGraphQuery } from '@/queries';
import { getDefaultConfig, spreadSDK } from '@/utils';
import { ReactNode, useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function DashboardPage(): ReactNode {
    const { address, isConnected } = useAccount();

    useEffect(() => {
        if (isConnected) {
            spreadSDK.init(
                getDefaultConfig({
                    publicAddress: address,
                }),
            );
        }
    }, [isConnected]);

    return (
        <>
            <Navbar type="connect" />
            <div className="grid container grid-cols-2">
                <div></div>
                <div>
                    <SpreadCandleStickGraph />
                    <div className="h-2" />
                    <SpreadMeanGraph />
                </div>
            </div>
        </>
    );
}
