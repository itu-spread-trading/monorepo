'use client';

import {
    type SetterOrUpdater,
    atom,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';

export type Wallet = {
    address: string;
    privateKey: string;
    associatedAddress: string;
};

export const WalletStore = atom<Wallet | null>({
    default: null,
    key: 'WalletStore.Atom',
});

export const useWallet = (): Wallet => {
    return useRecoilValue(WalletStore) as Wallet;
};

export const useSetWallet = (): SetterOrUpdater<Wallet | null> => {
    return useSetRecoilState(WalletStore);
};
