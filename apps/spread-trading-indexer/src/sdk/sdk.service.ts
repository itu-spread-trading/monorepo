import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import Axios, { AxiosInstance } from 'axios';
import { WalletEntity } from 'src/entities/wallet.entity';
import { GetTokenPairDto } from 'src/sdk/sdk.dto';
import { Environment } from 'src/utils';
import { Repository } from 'typeorm';

@Injectable()
export class SDKService {
    logger = new Logger(SDKService.name);
    tokenBaseUrl = 'https://api.1inch.dev/token/v1.2';
    axios1Inch: AxiosInstance;

    constructor(
        @InjectRepository(WalletEntity)
        private walletRepository: Repository<WalletEntity>,

        private readonly jwtService: JwtService,
    ) {
        this.axios1Inch = Axios.create({
            baseURL: `${this.tokenBaseUrl}`,
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
}
