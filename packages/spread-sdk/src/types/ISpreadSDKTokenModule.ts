import {
    ISpreadSDKModule,
    SpreadSDKSupportedSymbols,
    SpreadSDKTokenPair,
} from '.';

export interface ISpreadSDKTokenModule extends ISpreadSDKModule {
    /**
     * Base URL of the module API
     */
    baseUrl: string;

    /**
     *
     * @param props - The token pair with USDT
     */
    genTokenPair(
        symbol: SpreadSDKSupportedSymbols,
    ): Promise<SpreadSDKTokenPair>;
}
