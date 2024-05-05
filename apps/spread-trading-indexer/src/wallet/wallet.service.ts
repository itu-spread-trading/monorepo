import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { WalletEntity } from 'src/entities/wallet.entity';
import {
  verifyJwt,
  verifyLoginMessage,
  verifyRegistrationMessage,
} from 'src/utils';
import {
  IsRegisteredResponse,
  WalletCreateDto,
  WalletCreateResponse,
  WalletLoginDto,
  WalletLoginResponse,
} from 'src/wallet/wallet.dto';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  logger = new Logger(WalletService.name);

  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async genBySignature(signature: string): Promise<WalletEntity> {
    const address = verifyLoginMessage(signature);

    const wallet = this.walletRepository.findOne({
      where: {
        address,
      },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  async genByAddress(
    address: string,
    accessToken: string,
  ): Promise<WalletEntity> {
    verifyJwt(this.jwtService, accessToken);

    const wallet = this.walletRepository.findOne({
      where: {
        address,
      },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  async genLoginWallet(dto: WalletLoginDto): Promise<WalletLoginResponse> {
    const { address, signature } = dto;

    const verifiedAddress = verifyLoginMessage(signature);
    const lowerCaseAddress = address.toLowerCase();

    if (verifiedAddress != lowerCaseAddress) {
      throw new ForbiddenException('Invalid signature');
    }

    const wallet = await this.walletRepository.findOne({
      where: {
        address: lowerCaseAddress,
      },
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const accessToken = this.jwtService.sign({
      address: lowerCaseAddress,
      associatedAddress: wallet.associatedAddress,
      privateKey: wallet.associatedPrivateKey,
    });

    return {
      wallet,
      accessToken,
    };
  }

  async genCreateWallet(dto: WalletCreateDto): Promise<WalletCreateResponse> {
    const { address, signature } = dto;

    const verifiedAddress = verifyRegistrationMessage(signature);
    const lowerCaseAddress = address.toLowerCase();

    if (verifiedAddress != lowerCaseAddress) {
      throw new ForbiddenException('Invalid signature');
    }

    const randomWallet = ethers.Wallet.createRandom();
    const newWallet = this.walletRepository.create({
      associatedAddress: randomWallet.address,
      associatedPrivateKey: randomWallet.privateKey,
      address: lowerCaseAddress,
    });
    const createdWallet = await this.walletRepository.save(newWallet);

    const accessToken = this.jwtService.sign({
      address: lowerCaseAddress,
      privateKey: randomWallet.privateKey,
      associatedAddress: randomWallet.address,
    });

    return {
      wallet: createdWallet,
      accessToken: accessToken,
    };
  }

  async genIsRegistered(address: string): Promise<IsRegisteredResponse> {
    const wallet = await this.walletRepository.findOne({
      where: {
        address: address,
      },
    });

    return {
      isRegistered: wallet != null,
    };
  }
}
