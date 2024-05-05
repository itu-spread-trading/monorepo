import {
    Card,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components';
import {
    SpreadSDKOrder,
    SpreadSDKOrderStatus,
    SpreadSDKOrderType,
} from '@ituspreadtrading/sdk';
import { ReactNode } from 'react';

export const DashboardOrderHistory = (): ReactNode => {
    const orders: Array<SpreadSDKOrder> = [
        {
            id: 1,
            associtedLimitOrderHash: '0x',
            date: '2021-10-10',
            status: SpreadSDKOrderStatus.PENDING,
            type: SpreadSDKOrderType.SELL,
            size: 100,
            spread: -0.05,
            symbol: 'BNBUSDT',
        },
        {
            id: 2,
            associtedLimitOrderHash: '0x',
            date: '2021-10-10',
            status: SpreadSDKOrderStatus.PENDING,
            type: SpreadSDKOrderType.SELL,
            size: 100,
            spread: -0.05,
            symbol: 'BNBUSDT',
        },
        {
            id: 3,
            associtedLimitOrderHash: '0x',
            date: '2021-10-10',
            status: SpreadSDKOrderStatus.PENDING,
            type: SpreadSDKOrderType.SELL,
            size: 100,
            spread: -0.05,
            symbol: 'BNBUSDT',
        },
        {
            id: 4,
            associtedLimitOrderHash: '0x',
            date: '2021-10-10',
            status: SpreadSDKOrderStatus.PENDING,
            type: SpreadSDKOrderType.SELL,
            size: 100,
            spread: -0.05,
            symbol: 'BNBUSDT',
        },
        {
            id: 5,
            associtedLimitOrderHash: '0x',
            date: '2021-10-10',
            status: SpreadSDKOrderStatus.PENDING,
            type: SpreadSDKOrderType.SELL,
            size: 100,
            spread: -0.05,
            symbol: 'BNBUSDT',
        },
    ];

    return (
        <Card className="mt-2 max-h-[450px] overflow-auto">
            <CardHeader>Order History</CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Symbol</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Spread</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>LimitOrderHash</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.symbol}</TableCell>
                                    <TableCell>{order.size}$</TableCell>
                                    <TableCell>{order.spread}</TableCell>
                                    <TableCell>{order.type}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>
                                        {order.associtedLimitOrderHash}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
