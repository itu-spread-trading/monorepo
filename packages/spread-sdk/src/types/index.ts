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
     * API url override
     */
    apiUrlOverride?: string;

    /**
     * API key for Spread SDK
     */
    apiKey: string;

    /**
     * Chain ID of the blockchain network
     */
    chainId: number;

    /**
     * Public address of the wallet
     */
    publicAddress: string;

    /**
     * Private key of the wallet
     */
    privateKey?: string;
};

export type SpreadSDKModuleInitProps = SpreadSDKInitProps;

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

export interface SpreadSDKOrderbookLimitOrdersQuery extends SpreadSDKBaseQuery {
    /**
     * Order by field
     */
    sortBy?:
        | 'createDateTime'
        | 'takerRate'
        | 'makerRate'
        | 'makerAmount'
        | 'takerAmount';

    /**
     * Address of the taker asset
     */
    takerAsset?: string;

    /**
     * Address of the maker asset
     */
    makerAsset?: string;
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

export * from './ISpreadSDKOrderbookModule';
export * from './ISpreadSDKSwapModule';
