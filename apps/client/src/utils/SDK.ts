import {
    SpreadSDK,
    SpreadSDKInitProps,
    nullthrows,
} from '@ituspreadtrading/sdk';
import { ethers } from 'ethers';

export const getDefaultConfig = (
    overrides: Partial<SpreadSDKInitProps> = {},
): SpreadSDKInitProps => {
    return {
        apiKey: nullthrows(process.env.NEXT_PUBLIC_1INCH_API_KEY),
        publicAddress: ethers.constants.AddressZero,
        chainId: 56,
        apiUrlOverride: 'http://localhost:8000',
        ...overrides,
    };
};

export const spreadSDK = SpreadSDK.create(getDefaultConfig());
