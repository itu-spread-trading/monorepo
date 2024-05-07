import { ChainId, LimitOrderBuilder } from '@1inch/limit-order-protocol-utils';
import Axios, { AxiosInstance } from 'axios';
import { ethers } from 'ethers';

import {
    ISpreadSDKOrderbookModule,
    SpreadSDKBaseQuery,
    SpreadSDKCreateLimitOrderProps,
    SpreadSDKInitProps,
    SpreadSDKLimitOrder,
    SpreadSDKModuleInitProps,
    SpreadSDKOrderbookLimitOrdersQuery,
} from '../types';
import { getApiUrlOrOverride, getProvider } from '../utils';

export class SpreadSDKOrderbookModule implements ISpreadSDKOrderbookModule {
    public props: SpreadSDKModuleInitProps;

    public baseUrl: string;
    protected apiUrl: string;
    private axiosSpread: AxiosInstance;
    private axios1Inch: AxiosInstance;

    constructor(props: SpreadSDKModuleInitProps) {
        this.init(props);
    }

    protected limitOrderProtocolAddresses: { [key in ChainId]: string } = {
        [ChainId.ethereumMainnet]: '0x1111111254eeb25477b68fb85ed929f73a960582',
        [ChainId.binanceMainnet]: '0x1111111254eeb25477b68fb85ed929f73a960582',
        [ChainId.polygonMainnet]: '0x1111111254eeb25477b68fb85ed929f73a960582',
        [ChainId.optimismMainnet]: '0x1111111254eeb25477b68fb85ed929f73a960582',
        [ChainId.arbitrumMainnet]: '0x1111111254eeb25477b68fb85ed929f73a960582',
        [ChainId.auroraMainnet]: '0x1111111254eeb25477b68fb85ed929f73a960582',
        [ChainId.gnosisMainnet]: '0x1111111254eeb25477b68fb85ed929f73a960582',
        [ChainId.avalancheMainnet]:
            '0x1111111254eeb25477b68fb85ed929f73a960582',
        [ChainId.fantomMainnet]: '0x1111111254eeb25477b68fb85ed929f73a960582',
        [ChainId.klaytnMainnet]: '0x1111111254eeb25477b68fb85ed929f73a960582',
        [ChainId.zkSyncEraMainnet]:
            '0x6e2b76966cbd9cf4cc2fa0d76d24d5241e0abc2f',
        [ChainId.baseMainnet]: '0x1111111254eeb25477b68fb85ed929f73a960582',
    } as const;

    public init(props: SpreadSDKInitProps): void {
        this.props = props;

        // Api Configuration
        this.baseUrl = `https://api.1inch.dev/orderbook/v4.0/${props.chainId}/`;
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
        const contractAddress =
            this.limitOrderProtocolAddresses[this.props.chainId];
        const limitOrderBuilder = new LimitOrderBuilder(contractAddress, {
            version: '4',
            domainName: '1inch',
        });

        const limitOrder = limitOrderBuilder.buildLimitOrder({
            makerAsset: props.makerAsset,
            takerAsset: props.takerAsset,
            maker: props.maker,
            makingAmount: props.makingAmount,
            takingAmount: props.takingAmount,
        });

        const limitOrderTypedData = limitOrderBuilder.buildLimitOrderTypedData(
            limitOrder,
            BigInt(this.props.chainId),
            contractAddress,
        );

        const wallet = new ethers.Wallet(
            this.props.privateKey,
            getProvider(this.props.chainId),
        );

        delete limitOrderTypedData.types.EIP712Domain;

        const signature = await wallet._signTypedData(
            limitOrderTypedData.domain,
            limitOrderTypedData.types,
            limitOrderTypedData.message,
        );

        return {
            sdkType: '1inch',
            data: limitOrder,
            signature,
        };
    }
}
