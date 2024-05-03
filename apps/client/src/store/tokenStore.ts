'use client';
import { SpreadSDKSupportedSymbols } from '@ituspreadtrading/sdk';
import {
    type SetterOrUpdater,
    atom,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';

export const TokenStore = atom<SpreadSDKSupportedSymbols>({
    default: 'BNBUSDT',
    key: 'TokenStore.Atom',
});

export const useTokenPair = (): SpreadSDKSupportedSymbols => {
    return useRecoilValue(TokenStore);
};

export const useSetTokenPair =
    (): SetterOrUpdater<SpreadSDKSupportedSymbols> => {
        return useSetRecoilState(TokenStore);
    };
