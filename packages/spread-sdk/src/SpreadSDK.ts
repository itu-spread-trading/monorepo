import Axios, { AxiosInstance } from 'axios';
import { Wallet } from 'ethers';

import { SpreadSDKError } from './SpreadSDKError';
import {
    SpreadSDKOrderbookModule,
    SpreadSDKSwapModule,
    SpreadSDKTokenModule,
} from './modules';
import {
    ISpreadSDK,
    SpreadCandleResponse,
    SpreadGraphQueryParams,
    SpreadMeanResponse,
    SpreadQueryResponse,
    SpreadSDKInitProps,
    SpreadSDKModuleInitProps,
    SpreadSDKOrder,
    SpreadSDKStartBuySpreadDto,
    SpreadSDKStartSellSpreadDto,
    SpreadSDKUpdateOrderDto,
    SpreadStandardDeviationResponse,
} from './types';
import { getApiUrlOrOverride, getProvider } from './utils';

export class SpreadSDK implements ISpreadSDK {
    private props: SpreadSDKInitProps;
    private apiUrl: string;
    private axiosInstance: AxiosInstance;

    /**
     * Initialized state
     */
    private initialized: boolean = false;

    /**
     * Modules
     */
    orderbook: SpreadSDKOrderbookModule;
    swap: SpreadSDKSwapModule;
    token: SpreadSDKTokenModule;

    constructor(props: SpreadSDKInitProps) {
        this.init(props);
    }

    public static create(props: SpreadSDKModuleInitProps): SpreadSDK {
        return new SpreadSDK(props);
    }

    public init(props: SpreadSDKInitProps): void {
        this.props = props;
        this.orderbook = new SpreadSDKOrderbookModule(props);
        this.swap = new SpreadSDKSwapModule(props);
        this.token = new SpreadSDKTokenModule(props);
        this.initialized = true;
        this.axiosInstance = Axios.create({
            baseURL: getApiUrlOrOverride(props.apiUrlOverride),
        });
    }

    public isInitialized(): boolean {
        return this.initialized;
    }

    public getPublicAddress(): string {
        return this.props.publicAddress;
    }

    public async getSpreadGraph(
        query: SpreadGraphQueryParams,
    ): Promise<Array<SpreadCandleResponse>> {
        try {
            const response = await this.axiosInstance.get('/spread/graph', {
                params: query,
            });
            return response.data;
        } catch {
            throw SpreadSDKError.CouldNotGetSpread();
        }
    }

    public async getSpreadMeanGraph(
        query: SpreadGraphQueryParams,
    ): Promise<Array<SpreadMeanResponse>> {
        try {
            const response = await this.axiosInstance.get(
                '/spread/graph/mean',
                {
                    params: query,
                },
            );
            return response.data;
        } catch {
            throw SpreadSDKError.CouldNotGetSpread();
        }
    }
    public async getSpreadStandardDeviation(
        query: SpreadGraphQueryParams,
    ): Promise<SpreadStandardDeviationResponse> {
        try {
            const response = await this.axiosInstance.get('/spread/sd', {
                params: query,
            });
            return response.data;
        } catch {
            throw SpreadSDKError.CouldNotGetStandardDeviation();
        }
    }

    public async getSpread(): Promise<SpreadQueryResponse> {
        try {
            const response = await this.axiosInstance.get('/spread');
            return response.data;
        } catch {
            throw SpreadSDKError.CouldNotGetSpread();
        }
    }

    public async genOrders(): Promise<Array<SpreadSDKOrder>> {
        if (!this.initialized) {
            throw SpreadSDKError.NotInitialized();
        }

        try {
            const response = await this.axiosInstance.get('/order', {
                params: {
                    address: this.props.publicAddress.toLowerCase(),
                },
            });
            return response.data;
        } catch {
            throw SpreadSDKError.CouldNotGetOrders();
        }
    }

    public async genLastOrder(): Promise<SpreadSDKOrder | null> {
        if (!this.initialized) {
            throw SpreadSDKError.NotInitialized();
        }

        try {
            const response = await this.axiosInstance.get('/order/last', {
                params: {
                    address: this.props.publicAddress.toLowerCase(),
                },
            });
            return response.data;
        } catch {
            throw SpreadSDKError.CouldNotGetLastOrder();
        }
    }

    public async genOrdersById(id: number): Promise<SpreadSDKOrder | null> {
        if (!this.initialized) {
            throw SpreadSDKError.NotInitialized();
        }

        try {
            const response = await this.axiosInstance.get(`/order/${id}`);
            return response.data;
        } catch {
            throw SpreadSDKError.CouldNotGetOrder();
        }
    }

    public async genUpdateOrderById(
        id: number,
        dto: SpreadSDKUpdateOrderDto,
    ): Promise<SpreadSDKOrder | null> {
        if (!this.initialized) {
            throw SpreadSDKError.NotInitialized();
        }

        try {
            const response = await this.axiosInstance.put(`/order/${id}`, dto);
            return response.data;
        } catch {
            throw SpreadSDKError.CouldNotUpdateOrder();
        }
    }

    public async genCreateOrder(
        dto: Partial<SpreadSDKOrder>,
    ): Promise<SpreadSDKOrder> {
        if (!this.initialized) {
            throw SpreadSDKError.NotInitialized();
        }

        try {
            const response = await this.axiosInstance.post('/order', dto);
            return response.data;
        } catch {
            throw SpreadSDKError.CouldNotCreateOrder();
        }
    }

    public getWalletInstance(): Wallet | null {
        if (this.props.privateKey == null) {
            return null;
        }
        return new Wallet(
            this.props.privateKey,
            getProvider(this.props.chainId),
        );
    }

    public async genStartSellSpread(
        data: SpreadSDKStartSellSpreadDto,
    ): Promise<SpreadSDKOrder> {
        const orderResponse = await this.axiosInstance.post('/sdk/sell', data);
        return orderResponse.data;
    }

    public async genStartBuySpread(
        data: SpreadSDKStartBuySpreadDto,
    ): Promise<SpreadSDKOrder> {
        const orderResponse = await this.axiosInstance.post('/sdk/buy', data);
        return orderResponse.data;
    }
}
