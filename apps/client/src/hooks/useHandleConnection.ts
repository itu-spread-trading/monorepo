'use client';

import { useIsRegisteredMutation } from '@/app/mutations';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { SpreadJWT } from '@/types';
import { useSetWallet } from '@/store';
import { LOGIN_MESSAGE, REGISTER_MESSAGE } from '@/utils';
import {
    useLoginMutation,
    useRegisterMutation,
} from '@/app/mutations/useAuthMutations';

type Props = {
    onConnect?: () => void;
};

export const useHandleConnection = ({ onConnect }: Props = {}) => {
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();
    const { signMessageAsync } = useSignMessage();
    const isRegisteredMutation = useIsRegisteredMutation();
    const registerMutation = useRegisterMutation();
    const loginMutation = useLoginMutation();
    const setWallet = useSetWallet();

    useEffect(() => {
        const handler = async () => {
            if (isConnected && address) {
                const result = await new Promise((resolve) => {
                    setTimeout(async () => {
                        try {
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
                            setWallet(jwtDecode<SpreadJWT>(accessToken));
                            onConnect?.();
                            resolve(true);
                        } catch {
                            resolve(false);
                        }
                    }, 1000);
                });

                if (result === false) {
                    disconnect();
                }
            }
        };

        handler();
    }, [isConnected, address]);
};
