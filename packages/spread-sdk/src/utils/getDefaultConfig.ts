import { SpreadSDKInitProps } from '../types';
import dotenv from 'dotenv';
import { nullthrows } from './nullthrows';

dotenv.config();

export const getDefaultConfig = (): {
    chainId: number;
    apiKey: string;
} & Partial<SpreadSDKInitProps> => {
    return {
        chainId: 56,
        apiKey: nullthrows(
            process.env['1INCH_API_KEY'],
            'API_KEY is not defined',
        ),
    };
};
