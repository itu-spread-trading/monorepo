import {
    SpreadSDK,
    SpreadSDKInitProps,
    nullthrows,
} from '@ituspreadtrading/sdk';
import { ethers } from 'ethers';

export const API_BASE_URL = nullthrows(
    process.env.NEXT_PUBLIC_API_BASE_URL,
    'NEXT_PUBLIC_API_BASE_URL is not defined',
);

export const getDefaultConfig = (
    overrides: Partial<SpreadSDKInitProps> = {},
): SpreadSDKInitProps => {
    return {
        apiKey: nullthrows(process.env.NEXT_PUBLIC_1INCH_API_KEY),
        publicAddress: ethers.constants.AddressZero,
        chainId: 56,
        apiUrlOverride: API_BASE_URL,
        ...overrides,
    };
};

export const spreadSDK = SpreadSDK.create(getDefaultConfig());
