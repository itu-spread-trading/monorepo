export type SpreadSDK1InchData<T> = T & {
    sdkType: '1inch';
};

export type SpreadSDK1InchToken = SpreadSDK1InchData<{
    address: number;
    symbol: number;
    decimals: number;
    name: string;
    logoURI: string;
    tags: Array<string>;
}>;

export type SpreadSDK1InchLimitOrder = SpreadSDK1InchData<{
    signature: string;
    orderHash: string;
    createDateTime: string;
    remainingMakerAmount: string;
    makerBalance: string;
    makerAllowance: string;
    data: {
        makerAsset: string;
        takerAsset: string;
        salt: string;
        receiver: string;
        makingAmount: string;
        takingAmount: string;
        maker: string;
        extension: string;
        makerTraits: string;
    };
    makerRate: string;
    takerRate: string;
    isMakerContract: boolean;
    orderInvalidReason: Array<string> | null;
}>;

export type SpreadSDK1InchSwapParams = SpreadSDK1InchData<{
    src: string;
    dst: string;
    amount: string;
    from: string;
    slippage: string;
}>;

export type SpreadSDK1InchSwapCalldata = SpreadSDK1InchData<{
    dstAmount: string;
    tx: {
        from: string;
        to: string;
        data: string;
        value: string;
        gas: number;
        gasPrice: string;
    };
}>;

export type SpreadSDKGet1InchApproveParamsProps = SpreadSDK1InchData<{
    tokenAddress: string;
    amount: string;
}>;

export type SpreadSDK1InchApproveCalldata = {
    data: string;
    gasPrice: string;
    to: string;
    value: string;
};

export type SpreadSDK1InchCreateLimitOrderProps = SpreadSDK1InchData<{
    orderHash: string;
    signature: string;
    data: {
        makerAsset: string;
        takerAsset: string;
        maker: string;
        makingAmount: string;
        takingAmount: string;
        receiver?: string;
        salt?: string;
        extension?: string;
        makerTraits?: string;
    };
}>;
