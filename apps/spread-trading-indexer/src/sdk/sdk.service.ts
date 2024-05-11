import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import Axios, { AxiosError, AxiosInstance } from 'axios';
import { OrderEntity, OrderStatus } from 'src/entities/order.entity';
import { WalletEntity } from 'src/entities/wallet.entity';
import { OrderService } from 'src/order/order.service';
import {
    GetTokenPairDto,
    StartBuySpreadDto,
    StartSellSpreadDto,
    SwapQuoteDto,
} from 'src/sdk/sdk.dto';
import { Environment } from 'src/utils';
import { getProvider, getTreasuryWallet } from 'src/utils/getTreasuryWallet';
import { Repository } from 'typeorm';

@Injectable()
export class SDKService {
    logger = new Logger(SDKService.name);
    tokenBaseUrl = 'https://api.1inch.dev/token/v1.2';
    swapBaseUrl = 'https://api.1inch.dev/swap/v6.0/';
    axios1Inch: AxiosInstance;
    axios1InchSwap: AxiosInstance;

    constructor(
        @InjectRepository(WalletEntity)
        private walletRepository: Repository<WalletEntity>,

        private readonly orderService: OrderService,
        private readonly jwtService: JwtService,
    ) {
        this.axios1Inch = Axios.create({
            baseURL: `${this.tokenBaseUrl}`,
            headers: {
                Authorization: `Bearer ${Environment.ONEINCH_API_KEY}`,
            },
        });

        this.axios1InchSwap = Axios.create({
            baseURL: `${this.swapBaseUrl}`,
            headers: {
                Authorization: `Bearer ${Environment.ONEINCH_API_KEY}`,
            },
        });
    }

    public async genToken(query: GetTokenPairDto): Promise<{
        address: string;
    }> {
        const tokenName = query.symbol;
        const relatedTokenResults = await this.axios1Inch.get(
            `${query.chainId}/search`,
            {
                params: {
                    query: tokenName,
                    chain_id: query.chainId,
                    limit: 1,
                },
            },
        );

        const relatedToken = relatedTokenResults.data[0];

        return {
            address: relatedToken.address,
        };
    }

    public async genSwapQuote(dto: SwapQuoteDto) {
        try {
            const calldataResponse = await this.axios1InchSwap.get(
                `${dto.chainId}/swap`,
                {
                    params: dto.swapParams,
                },
            );
            return calldataResponse.data;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new BadRequestException(
                    err.response?.data?.description ||
                        'Failed to get swap quote',
                );
            }
        }
    }

    public async genStartSellSpread(
        dto: StartSellSpreadDto,
    ): Promise<OrderEntity> {
        const order = await this.orderService.genCreateOrder({
            address: dto.address,
            size: dto.size,
            spread: dto.spread,
            symbol: dto.symbol,
            type: dto.type,
            associatedSwap: null,
            associatedLimitOrder: dto.associatedLimitOrder,
        });

        try {
            const wallet = getTreasuryWallet();
            const provider = getProvider();
            const gasPrice = await provider.getGasPrice();

            const limitOrderTx = await wallet.sendTransaction({
                from: wallet.address,
                to: dto.usdtAddress,
                data: dto.metaCalldata,
                gasLimit: 1000000,
                gasPrice,
            });
            await limitOrderTx.wait();

            const updatedOrder = await this.orderService.genUpdateOrder(
                order.id,
                {
                    status: OrderStatus.FILLED,
                },
            );
            return updatedOrder;
        } catch (err) {
            console.log(err);
            const updatedOrder = await this.orderService.genUpdateOrder(
                order.id,
                {
                    status: OrderStatus.CANCELLED,
                },
            );
            return updatedOrder;
        }
    }

    public async genStartBuySpread(
        dto: StartBuySpreadDto,
    ): Promise<OrderEntity> {
        const order = await this.orderService.genCreateOrder({
            address: dto.address,
            size: dto.size,
            spread: dto.spread,
            symbol: dto.symbol,
            type: dto.type,
            associatedSwap: null,
            associatedLimitOrder: dto.associatedLimitOrder,
        });

        try {
            const wallet = getTreasuryWallet();
            const provider = getProvider();
            const gasPrice = await provider.getGasPrice();

            const limitOrderTx = await wallet.sendTransaction({
                from: wallet.address,
                to: dto.tokenAddress,
                data: dto.metaCalldata,
                gasLimit: 1000000,
                gasPrice,
            });
            await limitOrderTx.wait();

            const updatedOrder = await this.orderService.genUpdateOrder(
                order.id,
                {
                    status: OrderStatus.FILLED,
                },
            );
            return updatedOrder;
        } catch (err) {
            console.log(err);
            const updatedOrder = await this.orderService.genUpdateOrder(
                order.id,
                {
                    status: OrderStatus.CANCELLED,
                },
            );
            return updatedOrder;
        }
    }
}
