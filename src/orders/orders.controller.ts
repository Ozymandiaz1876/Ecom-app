import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddItemDto } from './dto/add-item.dto';
import { PlaceOrderDto } from './dto/place-order.dto';

@Controller('order')
export class OrdersController {
  constructor(private readonly OrdersService: OrdersService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  async addItemToCart(@Body() addItemDto: AddItemDto) {
    return this.OrdersService.addItemToOrder(addItemDto);
  }

  @Post('checkout')
  @UseGuards(JwtAuthGuard)
  async checkout(@Body() checkoutDto: PlaceOrderDto) {
    return this.OrdersService.checkoutOrder(checkoutDto);
  }
}
