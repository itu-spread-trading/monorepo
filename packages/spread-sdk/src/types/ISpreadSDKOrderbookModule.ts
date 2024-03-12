import { SpreadSDKBaseQuery, SpreadSDKLimitOrder } from '.';

export interface ISpreadSDKOrderbookModule {
    /**
     * @dev The API URL for the orderbook module
     */
    apiUrl: string;

    /**
     * @dev Get limit orders belonging to the specified address
     * @param props - The required metadata to build the swap
     */
    genLimitOrdersForAddress(query: SpreadSDKBaseQuery): void;

    /**
     * @dev Get the list of available tokens for swap
     */
    genLimitOrders(): Promise<Array<SpreadSDKLimitOrder>>;

    /**
     * @dev Get the number of tokens that is allowed to swap
     */
    genAllowance(): Promise<string>;
}
