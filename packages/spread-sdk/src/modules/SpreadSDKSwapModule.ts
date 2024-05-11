import { ChainId } from '@1inch/limit-order-protocol-utils';
import Axios, { AxiosInstance } from 'axios';

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
import { getApiUrlOrOverride } from '../utils';

export class SpreadSDKSwapModule implements ISpreadSDKSwapModule {
    public props: SpreadSDKModuleInitProps;

    public baseUrl: string;
    protected apiUrl: string;
    private axiosSpread: AxiosInstance;
    private axios1Inch: AxiosInstance;

    routerAddresses = {
        [ChainId.binanceMainnet]: '0x111111125421cA6dc452d289314280a0f8842A65',
    };

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
            headers: {
                Authorization: `Bearer ${props.apiKey}`,
            },
        });
    }

    public getSwapParams(
        props: SpreadSDKGetSwapParamsProps,
    ): SpreadSDKSwapParams {
        return {
            sdkType: '1inch',
            src: props.inputToken,
            dst: props.outputToken,
            amount: props.amount,
            from: this.props.publicAddress,
            slippage: '1',
        };
    }

    public async genSwapCalldata(
        params: SpreadSDKSwapParams,
    ): Promise<SpreadSDKSwapCalldata> {
        const swapResponse = await this.axiosSpread.post('/sdk/swapquote', {
            swapParams: params,
            chainId: this.props.chainId,
        });
        return swapResponse.data;
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

    public getRouterAddress(): string {
        return this.routerAddresses[this.props.chainId];
    }
}
