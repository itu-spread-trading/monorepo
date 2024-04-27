'use client';

import { SpreadGraph } from '@/app/dashboard/graph';
import { Navbar } from '@/components/navbar';
import { useSpreadGraphQuery } from '@/queries';
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

    const { data } = useSpreadGraphQuery({
        symbol: 'BNBUSDT',
    });

    return (
        <>
            <Navbar type="connect" />
            {data != null && <SpreadGraph data={data} />}
        </>
    );
}
