import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from 'src/entities/wallet.entity';
import { SDKController } from 'src/sdk/sdk.controller';
import { SDKService } from 'src/sdk/sdk.service';
import { Environment } from 'src/utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletEntity]),

    JwtModule.register({ secret: Environment.JWT_SECRET }),
  ],
  controllers: [SDKController],
  providers: [SDKService],
})
export class SDKModule {}
