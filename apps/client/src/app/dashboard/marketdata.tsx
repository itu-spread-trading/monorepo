import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { MarketData } from '@/types';
import { ReactNode } from 'react';

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
