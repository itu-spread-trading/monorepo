import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Wallet } from '@/store';
import { formatAddress } from '@ituspreadtrading/sdk';
import { formatUnits } from 'viem';
import { useBalance } from 'wagmi';

type Props = {
    wallet: Wallet;
};

export const AssociatedWalletView = ({ wallet }: Props) => {
    const { data: balance } = useBalance({
        address: wallet.address as `0x${string}`,
    });

    return (
        <Dialog>
            <DialogTrigger>Associated Wallet</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Associated Spread Account With Your Wallet
                    </DialogTitle>
                    <DialogDescription className="mt-4">
                        This account is used to do quick operations on Spread
                        platform without being needed to sign every transaction.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-2 flex flex-col">
                    <DialogDescription>
                        <div>Address: {wallet.associatedAddress}</div>
                        <div>PvKey: {formatAddress(wallet.privateKey)}</div>
                        {balance != null ? (
                            <div>
                                Balance:{' '}
                                {formatUnits(balance.value, balance.decimals)}{' '}
                                {balance.symbol}
                            </div>
                        ) : null}
                    </DialogDescription>
                </div>
            </DialogContent>
        </Dialog>
    );
};
