import {
    ISpreadSDKModule,
    SpreadSDKSupportedSymbols,
    SpreadSDKTokenPair,
} from '.';

export interface ISpreadSDKTokenModule extends ISpreadSDKModule {
    /**
     *
     * @param props - The token pair with USDT
     */
    genTokenPair(
        symbol: SpreadSDKSupportedSymbols,
    ): Promise<SpreadSDKTokenPair>;
}
