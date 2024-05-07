'use client';

import { useIsRegisteredMutation } from '@/app/mutations';
import {
    useLoginMutation,
    useRegisterMutation,
} from '@/app/mutations/useAuthMutations';
import { useSetWallet } from '@/store';
import { SpreadJWT } from '@/types';
import { LOGIN_MESSAGE, REGISTER_MESSAGE } from '@/utils';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';

type Props = {
    onConnect?: () => void;
    runOnMount?: boolean;
    delay?: number;
};

export const useHandleConnection = ({
    onConnect,
    runOnMount = false,
    delay = 1000,
}: Props = {}) => {
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();
    const { signMessageAsync } = useSignMessage();
    const isRegisteredMutation = useIsRegisteredMutation();
    const registerMutation = useRegisterMutation();
    const loginMutation = useLoginMutation();
    const setWallet = useSetWallet();

    const handler = async () => {
        if (isConnected && address) {
            const result = await new Promise((resolve) => {
                setTimeout(async () => {
                    try {
                        console.log('Connecting wallet...');
                        const existingAccessToken =
                            localStorage.getItem('accessToken');

                        if (existingAccessToken != null) {
                            console.log('Access Token exists...');
                            const decoded =
                                jwtDecode<SpreadJWT>(existingAccessToken);
                            if (
                                decoded.address.toLowerCase() ===
                                address.toLowerCase()
                            ) {
                                setWallet(decoded);
                                onConnect?.();
                                resolve(true);
                                return;
                            }
                        }

                        const isRegistered =
                            await isRegisteredMutation.mutateAsync(address);
                        let wallet = null;
                        if (isRegistered) {
                            const signature = await signMessageAsync({
                                message: LOGIN_MESSAGE,
                            });
                            wallet = await loginMutation.mutateAsync({
                                address,
                                signature,
                            });
                        } else {
                            const signature = await signMessageAsync({
                                message: REGISTER_MESSAGE,
                            });

                            wallet = await registerMutation.mutateAsync({
                                address,
                                signature,
                            });
                        }
                        const accessToken = wallet.accessToken;
                        localStorage.setItem('accessToken', accessToken);
                        const _wallet = jwtDecode<SpreadJWT>(accessToken);
                        console.log('Setting wallet', _wallet);
                        setWallet(_wallet);
                        onConnect?.();
                        resolve(true);
                    } catch {
                        resolve(false);
                    }
                }, delay);
            });

            if (result === false) {
                disconnect();
            }
        }
    };

    useEffect(() => {
        if (runOnMount) {
            handler();
        }
    }, [isConnected, address, runOnMount]);

    return handler;
};
