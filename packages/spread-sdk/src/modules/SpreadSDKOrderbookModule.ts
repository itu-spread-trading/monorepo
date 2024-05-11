import {
    FillOrderParams,
    LimitOrderBuilder,
    LimitOrderProtocolFacade,
    PrivateKeyProviderConnector,
    Web3ProviderConnector,
    ZERO_ADDRESS,
    ZX,
    limitOrderProtocolAddresses,
} from '@1inch/limit-order-protocol-utils';
import Axios, { AxiosInstance } from 'axios';
import Web3 from 'web3';

import {
    ISpreadSDKOrderbookModule,
    SpreadSDKBaseQuery,
    SpreadSDKCreateLimitOrderProps,
    SpreadSDKInitProps,
    SpreadSDKLimitOrder,
    SpreadSDKModuleInitProps,
    SpreadSDKOrderbookLimitOrdersQuery,
} from '../types';
import { getApiUrlOrOverride, getRpcUrl } from '../utils';

export class SpreadSDKOrderbookModule implements ISpreadSDKOrderbookModule {
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
        const web3 = new Web3(getRpcUrl(this.props.chainId));
        const connector = new Web3ProviderConnector(web3);
        const contractAddress = limitOrderProtocolAddresses[this.props.chainId];

        const limitOrderProtocolFacade = new LimitOrderProtocolFacade(
            contractAddress,
            this.props.chainId,
            connector,
        );
        const limitOrderBuilder = new LimitOrderBuilder(
            contractAddress,
            this.props.chainId,
            connector,
        );

        const limitOrder = limitOrderBuilder.buildLimitOrder({
            makerAssetAddress: props.makerAsset,
            takerAssetAddress: props.takerAsset,
            makerAddress: props.maker,
            makingAmount: props.makingAmount,
            takingAmount: props.takingAmount,
            permit: '0x',
            receiver: ZERO_ADDRESS,
            allowedSender: ZERO_ADDRESS,
            getMakingAmount: ZERO_ADDRESS,
            getTakingAmount: ZERO_ADDRESS,
            preInteraction: '0x',
            postInteraction: '0x',
        });

        const limitOrderTypedData =
            limitOrderBuilder.buildLimitOrderTypedData(limitOrder);

        const privateKeyProviderConnector = new PrivateKeyProviderConnector(
            this.parseHex(this.props.privateKey),
            web3,
        );

        const signature = await privateKeyProviderConnector.signTypedData(
            this.props.publicAddress,
            limitOrderTypedData,
        );

        delete limitOrderTypedData.types.EIP712Domain;

        const calldata = limitOrderProtocolFacade.fillLimitOrder({
            order: limitOrder,
            signature,
            makingAmount: '0',
            takingAmount: props.takingAmount,
            thresholdAmount: '0',
            interaction: ZX,
            skipPermit: true,
        } as FillOrderParams);

        return {
            sdkType: '1inch',
            data: limitOrder,
            signature,
            calldata,
        };
    }

    public getProtocolAddress(): string {
        return limitOrderProtocolAddresses[this.props.chainId];
    }

    private parseHex(hex: string): string {
        return hex.startsWith('0x') ? hex.slice(2) : hex;
    }

    private formatHex(str: string): string {
        return str.startsWith('0x') ? str : `0x${str}`;
    }
}
