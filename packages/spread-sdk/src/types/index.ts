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

export class SpreadGraphQueryParams {
    symbol: SpreadSDKSupportedSymbols;
    interval?: '5m' | '1h' | '4h' | '1d';
    range?: '1d' | '1w' | '1m' | '3m' | '6m';
}
export type SpreadQueryResponse = {
    spread: number;
    date: string;
};

export type SpreadCandleResponse = {
    date: string;
    open: number;
    close: number;
    high: number;
    low: number;
};

export type SpreadMeanResponse = {
    date: string;
    value: number;
};

export type SpreadStandardDeviationResponse = {
    /**
     * Standard deviation of spread between futures and spot
     */
    value: number;
};

export enum SpreadSDKOrderStatus {
    PENDING = 'PENDING',
    FILLED = 'FILLED',
    CANCELLED = 'CANCELLED',
    COMPLETE = 'COMPLETE',
}

export enum SpreadSDKOrderType {
    BUY = 'BUY',
    SELL = 'SELL',
}

export type SpreadSDKOrder = {
    id: number;
    address: string;
    symbol: SpreadSDKSupportedSymbols;
    spread: number;
    size: number;
    tokenAmount: string | null;
    status: SpreadSDKOrderStatus;
    date: string;
    type: SpreadSDKOrderType;
    associatedLimitOrder: string | null;
    associatedSwap: string | null;
};

export type SpreadSDKCreateOrderDto = {
    address: string;
    symbol: string;
    spread: number;
    tokenAmount: string | null;
    size: number;
    type: SpreadSDKOrderType;
    associatedLimitOrder?: string;
    associatedSwap?: string;
};
export type SpreadSDKUpdateOrderDto = {
    status: SpreadSDKOrderStatus;
    associatedLimitOrder?: string;
    associatedSwap?: string;
};

export type SpreadSDKSwapQuoteDto = {
    swapParams: {
        src: string; // Token address of 1INCH
        dst: string; // Token address of DAI
        amount: string; // Amount of 1INCH to swap (in wei)
        from: string; // Address of the sender
        slippage: string; // Maximum acceptable slippage percentage for the swap (e.g., 1 for 1%)
        disableEstimate: string; // Set to true to disable estimation of swap details
        allowPartialFill: string; // Set to true to allow partial filling of the swap order
    };
    chainId: number;
};

export type SpreadSDKStartSellSpreadDto = {
    calldata: string;
    metaCalldata: string;
    usdtAddress: string;
    contractAddress: string;
} & SpreadSDKCreateOrderDto;

export type SpreadSDKStartBuySpreadDto = {
    calldata: string;
    metaCalldata: string;
    tokenAddress: string;
    contractAddress: string;
} & SpreadSDKCreateOrderDto;

export type SpreadSDKSupportedSymbols =
    | 'BNBUSDT'
    | 'ETHUSDT'
    | 'BTCUSDT'
    | 'XRPUSDT'
    | 'SOLUSDT'
    | 'ADAUSDT'
    | 'DOGEUSDT'
    | 'TRXUSDT'
    | 'MATICUSDT'
    | 'DOTUSDT'
    | 'LINKUSDT'
    | 'LTCUSDT'
    | 'USDCUSDT'
    | 'AVAXUSDT'
    | 'XMRUSDT'
    | 'ATOMUSDT'
    | 'UNIUSDT'
    | 'FILUSDT'
    | 'APTUSDT'
    | 'MKRUSDT';

export type SpreadSDKTokenPair = {
    USDT: string;
    TOKEN: string;
};

export * from './ISpreadSDKModule';
export * from './ISpreadSDKOrderbookModule';
export * from './ISpreadSDKSwapModule';
export * from './ISpreadSDKTokenModule';
