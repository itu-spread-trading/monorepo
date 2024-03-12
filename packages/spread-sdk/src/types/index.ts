import { SpreadSDK1InchLimitOrder } from './1inch';

export * from './ISpreadSDK';
export * from './ISpreadSDKSwapModule';

export type SpreadSDKInitProps = {
    /**
     * API key for Spread SDK
     */
    apiKey: string;
};

export type SpreadSDKModuleInitProps = {
    /**
     * Chain ID of the blockchain network
     */
    chainId: number;

    /**
     * RPC URL of the blockchain network
     */
    rpcUrl: string;

    /**
     * Public address of the wallet
     */
    publicAddress: string;

    /**
     * Private key of the wallet
     */
    privateKey: string;
};

export interface SpreadSDKBaseQuery {
    /**
     * Number of records to take
     */
    limit?: number;

    /**
     * Searched page (for infinite query purpose)
     */
    page?: number;
}

export type SpreadSDKLimitOrder = SpreadSDK1InchLimitOrder;
