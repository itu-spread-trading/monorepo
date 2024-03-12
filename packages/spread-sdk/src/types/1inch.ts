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
