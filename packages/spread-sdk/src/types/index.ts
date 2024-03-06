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
