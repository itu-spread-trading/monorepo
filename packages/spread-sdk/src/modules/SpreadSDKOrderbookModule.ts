import Axios, { AxiosInstance } from 'axios';
import {
    ISpreadSDKOrderbookModule,
    SpreadSDKBaseQuery,
    SpreadSDKCreateLimitOrderProps,
    SpreadSDKLimitOrder,
    SpreadSDKModuleInitProps,
    SpreadSDKOrderbookLimitOrdersQuery,
} from '../types';
import { getApiUrlOrOverride } from '../utils';

export class SpreadSDKOrderbookModule implements ISpreadSDKOrderbookModule {
    public props: SpreadSDKModuleInitProps;

    public baseUrl: string;
    protected apiUrl: string;
    private axiosSpread: AxiosInstance;
    private axios1Inch: AxiosInstance;

    constructor(props: SpreadSDKModuleInitProps) {
        this.props = props;

        // Api Configuration
        this.baseUrl = `https://api.1inch.dev/orderbook/v4.0/${props.chainId}/`;
        this.apiUrl = getApiUrlOrOverride(props.apiUrlOverride);
        this.axiosSpread = Axios.create({
            baseURL: this.apiUrl,
        });
        this.axios1Inch = Axios.create({
            baseURL: this.baseUrl,
        });
    }

    public async genLimitOrdersForAddress(
        query?: SpreadSDKBaseQuery,
    ): Promise<Array<SpreadSDKLimitOrder>> {
        throw new Error('Method not implemented.');
    }

    /**
     * @dev Get limit order by order hash
     * @param orderHash - The order hash returned from the orderbook
     */
    public async genLimitOrdersByOrderHash(
        orderHash: string,
    ): Promise<SpreadSDKLimitOrder> {
        throw new Error('Method not implemented.');
    }

    /**
     * @dev Get all limit orders
     */
    public async genLimitOrders(
        query?: SpreadSDKOrderbookLimitOrdersQuery,
    ): Promise<Array<SpreadSDKLimitOrder>> {
        const request = await this.axios1Inch.get<Array<SpreadSDKLimitOrder>>(
            '/all',
            {
                params: query,
            },
        );

        const data = request.data;
        return data;
    }

    /**
     * @dev Create a new limit order on database
     */
    public async genCreateLimitOrder(
        props: SpreadSDKCreateLimitOrderProps,
    ): Promise<SpreadSDKLimitOrder> {
        throw new Error('Method not implemented.');
    }
}
