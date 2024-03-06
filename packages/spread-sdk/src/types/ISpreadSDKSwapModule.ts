export type GetSwapParamsProps = {
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

/**
 * @NOTIMPLEMENTED
 */
export type SpreadSDKToken = null;

export interface ISpreadSDKSwapModule {
    /**
     * @dev The API URL for the swap module
     */
    apiUrl: string;

    /**
     *
     * @param props - The required metadata to build the swap
     */
    getSwapParams(props: GetSwapParamsProps): void;

    /**
     * @dev Get the list of available tokens for swap
     */
    genAvailableTokens(): Promise<SpreadSDKToken>;

    /**
     * @dev Get the number of tokens that is allowed to swap
     */
    genAllowance(): Promise<string>;
}
