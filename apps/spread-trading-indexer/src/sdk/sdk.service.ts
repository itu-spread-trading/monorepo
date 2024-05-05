import {
  SpreadSDK,
  SpreadSDKSupportedSymbols,
  SpreadSDKTokenPair,
} from '@ituspreadtrading/sdk/dist';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { WalletEntity } from 'src/entities/wallet.entity';
import { GetTokenPairDto } from 'src/sdk/sdk.dto';
import { Environment } from 'src/utils';
import { Repository } from 'typeorm';

@Injectable()
export class SDKService {
  logger = new Logger(SDKService.name);

  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,

    private readonly jwtService: JwtService,
  ) {}

  public async genTokenPair(
    query: GetTokenPairDto,
  ): Promise<SpreadSDKTokenPair> {
    const sdk = this.getReadOnlySDKInstance(query.chainId);
    const pair = await sdk.token.genTokenPair(
      query.symbol as SpreadSDKSupportedSymbols,
    );
    return pair;
  }

  private getReadOnlySDKInstance(chainId: number) {
    return new SpreadSDK({
      chainId,
      publicAddress: ethers.constants.AddressZero,
      apiKey: Environment.ONEINCH_API_KEY,
    });
  }
}
