import {
    SpreadSDK1InchApproveCalldata,
    SpreadSDK1InchCreateLimitOrderProps,
    SpreadSDK1InchLimitOrder,
    SpreadSDK1InchSwapCalldata,
    SpreadSDK1InchSwapParams,
    SpreadSDK1InchToken,
    SpreadSDKGet1InchApproveParamsProps,
} from './1inch';

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

export type SpreadSDKToken = SpreadSDK1InchToken;

export type SpreadSDKSwapParams = SpreadSDK1InchSwapParams;

export type SpreadSDKGetSwapParamsProps = {
    /**
     * Address of input token to be swapped
     */
    inputToken: string;

    /**
     * Address of output token to be received after swap
     */
    outputToken: string;

    /**
     * Amount of input token to be swapped in wei
     */
    amount: string;
};

export type SpreadSDKSwapCalldata = SpreadSDK1InchSwapCalldata;

export type SpreadSDKApproveCallData = SpreadSDK1InchApproveCalldata;

export type SpreadSDKGetApproveParamsProps =
    SpreadSDKGet1InchApproveParamsProps;

export type SpreadSDKCreateLimitOrderProps =
    SpreadSDK1InchCreateLimitOrderProps;
