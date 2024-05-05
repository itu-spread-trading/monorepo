import { Button } from '@/components/ui/button';
import { projectId } from '@/context';
import { formatAddress } from '@ituspreadtrading/sdk';
import { ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

export const ConnectButton = (): ReactNode => {
    const { connect } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected, address } = useAccount();

    return (
        <div className="flex items-center">
            {isConnected ? (
                <>
                    <span>{formatAddress(address)}</span>
                    <Button
                        size="sm"
                        variant="destructive"
                        className="ml-4"
                        onClick={async () => {
                            await disconnectAsync();
                            localStorage.removeItem('accessToken');
                        }}
                    >
                        Disconnect
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        size="sm"
                        onClick={() => {
                            connect({
                                connector: injected(),
                            });
                        }}
                    >
                        Connect Injected
                    </Button>
                    <Button
                        size="sm"
                        className="ml-2"
                        onClick={() => {
                            connect({
                                connector: walletConnect({
                                    projectId,
                                }),
                            });
                        }}
                    >
                        WalletConnect
                    </Button>
                </>
            )}
        </div>
    );
};
