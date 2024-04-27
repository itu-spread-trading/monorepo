import {
    ISpreadSDKSwapModule,
    SpreadSDKApproveCallData,
    SpreadSDKGetApproveParamsProps,
    SpreadSDKGetSwapParamsProps,
    SpreadSDKInitProps,
    SpreadSDKModuleInitProps,
    SpreadSDKSwapCalldata,
    SpreadSDKSwapParams,
    SpreadSDKToken,
} from '../types';
import Axios, { AxiosInstance } from 'axios';
import { getApiUrlOrOverride } from '../utils';

export class SpreadSDKSwapModule implements ISpreadSDKSwapModule {
    public props: SpreadSDKModuleInitProps;

    public baseUrl: string;
    protected apiUrl: string;
    private axiosSpread: AxiosInstance;
    private axios1Inch: AxiosInstance;

    constructor(props: SpreadSDKModuleInitProps) {
        this.init(props);
    }

    public init(props: SpreadSDKInitProps): void {
        this.props = props;

        // Api Configuration
        this.baseUrl = `https://api.1inch.dev/swap/v6.0/${props.chainId}/`;
        this.apiUrl = getApiUrlOrOverride(props.apiUrlOverride);
        this.axiosSpread = Axios.create({
            baseURL: this.apiUrl,
        });
        this.axios1Inch = Axios.create({
            baseURL: this.baseUrl,
        });
    }

    public getSwapParams(
        props: SpreadSDKGetSwapParamsProps,
    ): SpreadSDKSwapParams {
        throw new Error('Method not implemented.');
    }

    public async genSwapCalldata(
        params: SpreadSDKSwapParams,
    ): Promise<SpreadSDKSwapCalldata> {
        throw new Error('Method not implemented.');
    }

    public async genApproveCalldata(
        params: SpreadSDKGetApproveParamsProps,
    ): Promise<SpreadSDKApproveCallData> {
        throw new Error('Method not implemented.');
    }

    public async genAvailableTokens(): Promise<SpreadSDKToken> {
        throw new Error('Method not implemented.');
    }

    public async genAllowance(tokenAddress: string): Promise<string> {
        throw new Error('Method not implemented.');
    }
}
