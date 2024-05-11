import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useGetTokenAmountFromUSD } from '@/hooks/useGetTokenAmountFromUSD';
import { useTokenPair } from '@/store';
import { MarketData } from '@/types';
import { symbolToDecimal } from '@/utils/symbolToDecimal';
import { useWalletTokenBalance, useWalletUSDTBalance } from '@/utils/wallet';
import { formatSpreadSDKSymbolTo1inchToken } from '@ituspreadtrading/sdk';
import { ReactNode } from 'react';
import { formatUnits } from 'viem';

export const MarketDataTable = ({
    marketData,
}: {
    marketData: MarketData;
}): ReactNode => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Spot Price</TableHead>
                    <TableHead>Futures Price </TableHead>
                    <TableHead>Spot Best Bid</TableHead>
                    <TableHead>Futures Best Bid</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>{marketData.spotPrice}$</TableCell>
                    <TableCell>{marketData.futuresPrice}$</TableCell>
                    <TableCell>{marketData.bestBidPrice}$</TableCell>
                    <TableCell>{marketData.futuresBestBidPrice}$</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Spread</TableCell>
                    <TableCell>{marketData.spread}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export const BalanceTable = (): ReactNode => {
    const tokenPair = useTokenPair();

    const tokenBalance = useWalletTokenBalance();
    const usdtBalance = useWalletUSDTBalance();

    const { getTokenAmountInUsd } = useGetTokenAmountFromUSD();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        {formatSpreadSDKSymbolTo1inchToken(tokenPair)} Balance
                    </TableHead>
                    <TableHead>USDT Balance</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        {formatUnits(tokenBalance, symbolToDecimal(tokenPair))}{' '}
                        - ${getTokenAmountInUsd(tokenBalance)}
                    </TableCell>
                    <TableCell>
                        {formatUSDT(usdtBalance)} - ${formatUSDT(usdtBalance)}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

const formatUSDT = (balance: bigint) => {
    return Number(formatUnits(balance, 18)).toFixed(6);
};
