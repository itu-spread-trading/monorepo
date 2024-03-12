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
    genLimitOrdersForAddress(
        query?: SpreadSDKBaseQuery,
    ): Promise<Array<SpreadSDKLimitOrder>>;

    /**
     * @dev Get limit order by order hash
     * @param orderHash - The order hash returned from the orderbook
     */
    genLimitOrdersByOrderHash(orderHash: string): Promise<SpreadSDKLimitOrder>;

    /**
     * @dev Get all limit orders
     */
    genLimitOrders(
        query?: SpreadSDKBaseQuery,
    ): Promise<Array<SpreadSDKLimitOrder>>;
}
