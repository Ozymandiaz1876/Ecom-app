import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddItemDto } from './dto/add-item.dto';
import { PlaceOrderDto } from './dto/place-order.dto';
import { base64Decode } from 'src/utils';

@Controller('order')
export class CartController {
  constructor(private readonly OrdersService: OrdersService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  async addItemToCart(@Body() addItemDto: AddItemDto) {
    const { itemId, quantity, orderId, userId } = addItemDto;

    let decodedOrderId: string;
    let decodedUserId: string;

    const decodedItemId = base64Decode(itemId);

    if (orderId) {
      decodedOrderId = base64Decode(orderId);
    }
    if (userId) {
      decodedUserId = base64Decode(userId);
    }

    return this.OrdersService.addItemToOrder({
      orderId: decodedOrderId,
      userId: decodedUserId,
      itemId: decodedItemId,
      quantity,
    });
  }

  @Post('checkout')
  @UseGuards(JwtAuthGuard)
  async checkout(@Body() checkoutDto: PlaceOrderDto) {
    const { orderId, discountCode } = checkoutDto;

    const decodedOrderId = base64Decode(orderId);

    return this.OrdersService.checkoutOrder({
      orderId: decodedOrderId,
      discountCode,
    });
  }
}
