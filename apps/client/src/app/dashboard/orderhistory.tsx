import {
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components';
import { queries } from '@/queries';
import { useWallet } from '@/store';
import { spreadSDK } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useAccount } from 'wagmi';

export const DashboardOrderHistory = (): ReactNode => {
    const wallet = useWallet();
    const { isConnected } = useAccount();

    const { data } = useQuery({
        queryKey: [queries.ORDERS],
        queryFn: async () => {
            return await spreadSDK.genOrders();
        },
        refetchInterval: 2000,
        enabled: wallet != null && spreadSDK.isInitialized() && isConnected,
    });
    const orders = data ?? [];

    return (
        <Card className="mt-2 max-h-[450px] min-h-[250px] overflow-auto">
            <CardHeader>Order History</CardHeader>
            <CardContent>
                {orders.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Symbol</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead>Spread</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>LimitOrder</TableHead>
                                <TableHead>Swap</TableHead>
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
                                            {!order.associatedLimitOrder ? (
                                                'None'
                                            ) : (
                                                <Dialog>
                                                    <DialogTrigger className="underline">
                                                        See Order
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Order details
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <DialogDescription className="whitespace-pre-wrap">
                                                            {formatLimitOrder(
                                                                order.associatedLimitOrder,
                                                            )}
                                                        </DialogDescription>
                                                    </DialogContent>
                                                </Dialog>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {!order.associatedSwap ? null : (
                                                <a
                                                    target="_blank"
                                                    href={`https://bscscan.com/tx/${order.associatedSwap}`}
                                                    className="underline"
                                                >
                                                    {order.associatedSwap}
                                                </a>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex w-full">
                        <p className="m-auto mt-2 font-light">
                            You do not have any order history yet
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

const formatLimitOrder = (json: string) => {
    try {
        const parsed = JSON.parse(json);
        delete parsed['interactions'];
        delete parsed['offsets'];
        return JSON.stringify(parsed, null, 4);
    } catch (err) {
        return 'Could not fetch details';
    }
};
