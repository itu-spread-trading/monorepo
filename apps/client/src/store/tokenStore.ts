'use client';
import {
    SpreadSDKSupportedSymbols,
    SpreadSDKTokenPair,
} from '@ituspreadtrading/sdk';
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

export const OneInchTokenStore = atom<SpreadSDKTokenPair>({
    default: {},
    key: 'OneInchToken.Atom',
});

export const useTokenPair = (): SpreadSDKSupportedSymbols => {
    return useRecoilValue(TokenStore);
};

export const useSetTokenPair =
    (): SetterOrUpdater<SpreadSDKSupportedSymbols> => {
        return useSetRecoilState(TokenStore);
    };

export const useOneInchTokenPair = (): SpreadSDKTokenPair => {
    return useRecoilValue(OneInchTokenStore);
};

export const useSetOneInchTokenPair =
    (): SetterOrUpdater<SpreadSDKTokenPair> => {
        return useSetRecoilState(OneInchTokenStore);
    };
