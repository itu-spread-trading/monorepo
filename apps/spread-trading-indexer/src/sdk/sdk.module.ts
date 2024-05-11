import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import { WalletEntity } from 'src/entities/wallet.entity';
import { OrderService } from 'src/order/order.service';
import { SDKController } from 'src/sdk/sdk.controller';
import { SDKService } from 'src/sdk/sdk.service';
import { Environment } from 'src/utils';

@Module({
    imports: [
        TypeOrmModule.forFeature([WalletEntity, OrderEntity]),

        JwtModule.register({ secret: Environment.JWT_SECRET }),
    ],
    controllers: [SDKController],
    providers: [SDKService, OrderService],
})
export class SDKModule {}
