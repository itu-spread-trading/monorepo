export type SpreadSDK1InchToken = {
    sdkType: '1inch';
    address: number;
    symbol: number;
    decimals: number;
    name: string;
    logoURI: string;
    tags: Array<string>;
};

export interface SpreadSDK1InchLimitOrder {
    sdkType: '1inch';
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
}

export type SpreadSDK1InchSwapParams = {
    sdkType: '1inch';
    src: string;
    dst: string;
    amount: string;
    from: string;
    slippage: string;
};

export type SpreadSDK1InchSwapCalldata = {
    sdkType: '1inch';
    dstAmount: string;
    tx: {
        from: string;
        to: string;
        data: string;
        value: string;
        gas: number;
        gasPrice: string;
    };
};

export type SpreadSDKGet1InchApproveParamsProps = {
    tokenAddress: string;
    amount: string;
};

export type SpreadSDK1InchApproveCalldata = {
    sdkType: '1inch';
    data: string;
    gasPrice: string;
    to: string;
    value: string;
};
