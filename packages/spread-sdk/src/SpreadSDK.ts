import { SpreadSDKError } from './SpreadSDKError';
import { SpreadSDKOrderbookModule, SpreadSDKSwapModule } from './modules';
import {
    ISpreadSDK,
    ISpreadSDKOrderbookModule,
    ISpreadSDKSwapModule,
    SpreadCandleResponse,
    SpreadGraphQueryParams,
    SpreadMeanResponse,
    SpreadQueryResponse,
    SpreadSDKInitProps,
    SpreadSDKModuleInitProps,
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
}
