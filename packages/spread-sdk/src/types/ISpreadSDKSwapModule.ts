import {
    SpreadSDKApproveCallData,
    SpreadSDKGetApproveParamsProps,
    SpreadSDKGetSwapParamsProps,
    SpreadSDKSwapCalldata,
    SpreadSDKSwapParams,
    SpreadSDKToken,
} from '.';

export interface ISpreadSDKSwapModule {
    /**
     * Base URL of the module API
     */
    baseUrl: string;

    /**
     *
     * @param props - The required metadata to build the swap
     */
    getSwapParams(props: SpreadSDKGetSwapParamsProps): SpreadSDKSwapParams;

    /**
     * @dev Get the swap calldata to pass as transaction
     */
    genSwapCalldata(
        params: SpreadSDKSwapParams,
    ): Promise<SpreadSDKSwapCalldata>;

    /**
     * @dev Get the token approve calldata to pass as transaction
     */
    genApproveCalldata(
        params: SpreadSDKGetApproveParamsProps,
    ): Promise<SpreadSDKApproveCallData>;

    /**
     * @dev Get the list of available tokens for swap
     */
    genAvailableTokens(): Promise<SpreadSDKToken>;

    /**
     * @dev Get the number of tokens that is allowed to swap by token address
     */
    genAllowance(tokenAddress: string): Promise<string>;
}
