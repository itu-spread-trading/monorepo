import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/order.entity';
import { WalletEntity } from 'src/entities/wallet.entity';
import { CreateOrderDto, UpdateOrderDto } from 'src/order/order.dto';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    logger = new Logger(OrderService.name);

    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository: Repository<OrderEntity>,

        @InjectRepository(WalletEntity)
        private walletRepository: Repository<WalletEntity>,

        private readonly jwtService: JwtService,
    ) {}

    public async genCreateOrder(dto: CreateOrderDto): Promise<OrderEntity> {
        const newOrder = this.orderRepository.create(dto);
        const createdOrder = await this.orderRepository.save(newOrder);
        return createdOrder;
    }

    public async genOrders(): Promise<Array<OrderEntity>> {
        return await this.orderRepository.find();
    }

    public async genOrder(id: number): Promise<OrderEntity> {
        const order = await this.orderRepository.findOne({
            where: {
                id,
            },
        });
        return order;
    }

    public async genUpdateOrder(
        id: number,
        dto: UpdateOrderDto,
    ): Promise<OrderEntity> {
        const order = await this.genOrder(id);

        const updatedOrder = {
            ...order,
            ...dto,
        };

        const savedOrder = await this.orderRepository.save(updatedOrder);
        return savedOrder;
    }
}
