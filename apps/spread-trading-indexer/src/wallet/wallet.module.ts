import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from 'src/entities/wallet.entity';
import { Environment } from 'src/utils';
import { WalletController } from 'src/wallet/wallet.controller';
import { WalletService } from 'src/wallet/wallet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletEntity]),

    JwtModule.register({ secret: Environment.JWT_SECRET }),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
