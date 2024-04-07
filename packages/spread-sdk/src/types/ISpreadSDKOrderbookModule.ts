import {
    SpreadSDKBaseQuery,
    SpreadSDKCreateLimitOrderProps,
    SpreadSDKLimitOrder,
    SpreadSDKOrderbookLimitOrdersQuery,
} from '.';

export interface ISpreadSDKOrderbookModule {
    /**
     * Base URL of the module API
     */
    baseUrl: string;

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
        query?: SpreadSDKOrderbookLimitOrdersQuery,
    ): Promise<Array<SpreadSDKLimitOrder>>;

    /**
     * @dev Create a new limit order on database
     */
    genCreateLimitOrder(
        props: SpreadSDKCreateLimitOrderProps,
    ): Promise<SpreadSDKLimitOrder>;
}
