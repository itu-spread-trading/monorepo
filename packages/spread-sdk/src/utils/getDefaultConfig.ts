import { SpreadSDKInitProps } from '../types';

export const getDefaultConfig = (): {
    chainId: number;
} & Partial<SpreadSDKInitProps> => {
    return {
        chainId: 56,
    };
};
