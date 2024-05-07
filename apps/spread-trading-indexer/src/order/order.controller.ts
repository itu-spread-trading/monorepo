import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/order/order.dto';
import { OrderService } from 'src/order/order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    genCreateOrder(@Body() dto: CreateOrderDto) {
        return this.orderService.genCreateOrder(dto);
    }

    @Get()
    genOrders() {
        return this.orderService.genOrders();
    }

    @Get('/:id')
    genOrder(@Param('id') id: number) {
        return this.orderService.genOrder(id);
    }

    @Put('/:id')
    genUpdateOrder(@Param('id') id: number, @Body() dto: UpdateOrderDto) {
        return this.orderService.genUpdateOrder(id, dto);
    }
}
