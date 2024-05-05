import { OrderStatus } from 'src/entities/order.entity';

export class CreateOrderDto {
  symbol: string;
  spread: number;
  size: number;
}

export class UpdateOrderDto {
  status: OrderStatus;
}
