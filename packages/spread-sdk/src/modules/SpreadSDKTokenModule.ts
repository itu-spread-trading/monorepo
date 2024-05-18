import Axios, { AxiosInstance } from 'axios';

import {
    ISpreadSDKTokenModule,
    SpreadSDKInitProps,
    SpreadSDKModuleInitProps,
    SpreadSDKSupportedSymbols,
    SpreadSDKTokenPair,
} from '../types';
import {
    formatSpreadSDKSymbolTo1inchToken,
    getApiUrlOrOverride,
} from '../utils';

export class SpreadSDKTokenModule implements ISpreadSDKTokenModule {
    public props: SpreadSDKModuleInitProps;
    public baseUrl: string;
    public apiUrl: string;
    public axiosSpread: AxiosInstance;
    public axios1Inch: AxiosInstance;

    constructor(props: SpreadSDKModuleInitProps) {
        this.init(props);
    }

    public init(props: SpreadSDKInitProps): void {
        this.props = props;

        // Api Configuration
        this.baseUrl = `https://api.1inch.dev/token/v1.2/${props.chainId}/`;
        this.apiUrl = getApiUrlOrOverride(props.apiUrlOverride);
        this.axiosSpread = Axios.create({
            baseURL: this.apiUrl,
        });
        this.axios1Inch = Axios.create({
            baseURL: this.baseUrl,
            headers: {
                Authorization: `Bearer ${props.apiKey}`,
            },
        });
    }

    public async genTokenPair(
        symbol: SpreadSDKSupportedSymbols,
    ): Promise<SpreadSDKTokenPair> {
        const tokenName = formatSpreadSDKSymbolTo1inchToken(symbol);

        const relatedTokenResult = await this.axiosSpread.get(
            '/sdk/tokenpair',
            {
                params: {
                    symbol: tokenName,
                    chainId: this.props.chainId,
                },
            },
        );

        const relatedToken = relatedTokenResult.data;

        return {
            USDT: this.getUSDTAddress(this.props.chainId),
            TOKEN: relatedToken.address,
        };
    }

    public getUSDTAddress(chainId: number): string {
        if (chainId === 53) {
            // BSC
            return '0x55d398326f99059ff775485246999027b3197955';
        } else if (chainId === 1) {
            //Mainnet
            return '0xdac17f958d2ee523a2206206994597c13d831ec7';
        } else if (chainId === 42161) {
            //Arbitrum
            return '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9';
        } else if (chainId === 1313161554) {
            return '0x4988a896b1227218e4a686fde5eabdcabd91571f';
        } else if (chainId === 43114) {
            return '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7';
        } else {
            // Set default as BSC
            return '0x55d398326f99059ff775485246999027b3197955';
        }
    }
}
