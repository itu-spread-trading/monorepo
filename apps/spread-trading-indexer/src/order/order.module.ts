import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import { WalletEntity } from 'src/entities/wallet.entity';
import { OrderController } from 'src/order/order.controller';
import { OrderService } from 'src/order/order.service';
import { Environment } from 'src/utils';

@Module({
    imports: [
        TypeOrmModule.forFeature([WalletEntity, OrderEntity]),

        JwtModule.register({ secret: Environment.JWT_SECRET }),
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
