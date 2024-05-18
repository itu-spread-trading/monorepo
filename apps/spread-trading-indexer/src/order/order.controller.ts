import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/order/order.dto';
import { OrderService } from 'src/order/order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    genCreateOrder(@Body() dto: CreateOrderDto) {
        return this.orderService.genCreateOrder(dto);
    }

    @Get('/last')
    genLastOrder(@Query('address') address: string) {
        return this.orderService.genLastOrder(address);
    }

    @Get()
    genOrders(@Query('address') address: string) {
        return this.orderService.genOrders(address);
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
