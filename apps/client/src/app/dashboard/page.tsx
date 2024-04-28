'use client';

import { SpreadCandleStickGraph } from '@/app/dashboard/candleGraph';
import { SpreadMeanGraph } from '@/app/dashboard/meanGraph';
import { Navbar } from '@/components/navbar';
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
            <div className="grid container grid-cols-12">
                <div className="col-span-5"></div>
                <div className="col-span-7">
                    <SpreadCandleStickGraph />
                    <div className="h-2" />
                    <SpreadMeanGraph />
                </div>
            </div>
        </>
    );
}
