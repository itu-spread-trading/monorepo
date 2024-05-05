import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WalletEntity } from 'src/entities/wallet.entity';
import {
  IsRegisteredResponse,
  WalletCreateDto,
  WalletCreateResponse,
  WalletLoginDto,
  WalletLoginResponse,
} from 'src/wallet/wallet.dto';
import { WalletService } from 'src/wallet/wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  genCreateWallet(@Body() dto: WalletCreateDto): Promise<WalletCreateResponse> {
    return this.walletService.genCreateWallet(dto);
  }

  @Post('login')
  genLoginWallet(@Body() dto: WalletLoginDto): Promise<WalletLoginResponse> {
    return this.walletService.genLoginWallet(dto);
  }

  @Get('address/:address')
  genByAddress(@Query('address') address: string): Promise<WalletEntity> {
    return this.walletService.genByAddress(address);
  }

  @Get('status')
  genIsRegistered(
    @Query('address') address: string,
  ): Promise<IsRegisteredResponse> {
    return this.walletService.genIsRegistered(address);
  }
}
