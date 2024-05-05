import { SpreadSDKError } from './SpreadSDKError';
import {
    SpreadSDKOrderbookModule,
    SpreadSDKSwapModule,
    SpreadSDKTokenModule,
} from './modules';
import {
    ISpreadSDK,
    ISpreadSDKOrderbookModule,
    ISpreadSDKSwapModule,
    ISpreadSDKTokenModule,
    SpreadCandleResponse,
    SpreadGraphQueryParams,
    SpreadMeanResponse,
    SpreadQueryResponse,
    SpreadSDKInitProps,
    SpreadSDKModuleInitProps,
    SpreadSDKOrder,
    SpreadSDKSupportedSymbols,
    SpreadSDKTokenPair,
    SpreadSDKUpdateOrderDto,
    SpreadStandardDeviationResponse,
} from './types';
import { getApiUrlOrOverride } from './utils';
import Axios, { AxiosInstance } from 'axios';

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
    orderbook: ISpreadSDKOrderbookModule;
    swap: ISpreadSDKSwapModule;
    token: ISpreadSDKTokenModule;

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
            const response = await this.axiosInstance.get('/order');
            return response.data;
        } catch {
            throw SpreadSDKError.CouldNotGetOrders();
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

    public async genTokenPair(
        symbol: SpreadSDKSupportedSymbols,
    ): Promise<SpreadSDKTokenPair> {
        try {
            const tokenPair = await this.axiosInstance.get('/sdk/tokenpair', {
                params: {
                    symbol: symbol,
                    chainId: this.props.chainId,
                },
            });
            return tokenPair.data;
        } catch {
            throw SpreadSDKError.CouldNotGetTokenPair();
        }
    }
}
