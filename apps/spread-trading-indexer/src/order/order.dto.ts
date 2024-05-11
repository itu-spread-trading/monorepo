import { OrderStatus, OrderType } from 'src/entities/order.entity';

export class CreateOrderDto {
    address: string;
    symbol: string;
    spread: number;
    size: number;
    type: OrderType;
    associatedLimitOrder: string;
    associatedSwap: string;
}

export class UpdateOrderDto {
    status: OrderStatus;
    associatedLimitOrder?: string;
    associatedSwap?: string;
}
