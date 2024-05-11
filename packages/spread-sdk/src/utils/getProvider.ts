import { ChainId } from '@1inch/limit-order-protocol-utils';
import { ethers } from 'ethers';

import { SpreadSDKError } from '../SpreadSDKError';

export const getRpcUrl = (chainId: number): string => {
    if (chainId === ChainId.binanceMainnet) {
        return 'https://bsc-dataseed1.binance.org/';
    } else {
        throw SpreadSDKError.UnsupportedChain();
    }
};

export const getProvider = (
    chainId: number,
): ethers.providers.JsonRpcProvider => {
    return new ethers.providers.JsonRpcProvider(getRpcUrl(chainId));
};
