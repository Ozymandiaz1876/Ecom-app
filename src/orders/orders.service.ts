import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from './orders.model';
import { OrderStatusEnum } from 'src/constants/enums/OrderStatus.enum';
import { PlaceOrderDto } from './dto/place-order.dto';
import { AddItemDto } from './dto/add-item.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getAllOrders(): Order[] {
    return this.ordersRepository.findAll();
  }

  getOrderById(id: string): Order {
    const order = this.ordersRepository.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  getOrderByNumber(orderNumber: number): Order {
    const order = this.ordersRepository
      .findAll()
      .find((order) => order.orderNumber === orderNumber);
    if (!order) {
      throw new NotFoundException(`Order with number ${orderNumber} not found`);
    }
    return order;
  }

  getOrdersByUserId(userId: string): Order[] {
    return this.ordersRepository.findByUserId(userId);
  }

  addItemToOrder(addItemDto: AddItemDto): CreateOrderDto {
    const { userId, orderId, quantity, itemId } = addItemDto;

    if (!userId && !orderId) {
      throw new NotFoundException('either userId or orderId is required');
    }

    // Check if the user has a pending order
    let pendingOrder: Order;
    if (userId) {
      pendingOrder = this.ordersRepository
        .findByUserId(userId)
        .find((order) => order.status === OrderStatusEnum.PENDING);
    } else if (orderId) {
      pendingOrder = this.ordersRepository.findById(orderId);
    }

    if (!pendingOrder) {
      // If no pending order, create a new one
      pendingOrder = this.ordersRepository.create({ userId, items: [] });
    }

    const itemIndex = pendingOrder.items.findIndex(
      (item) => item.itemId === itemId,
    );
    if (itemIndex > -1) {
      // Update quantity if item already exists in the order
      pendingOrder.items[itemIndex].quantity += quantity;
    } else {
      // Add new item to the order
      pendingOrder.items.push({ itemId, quantity });
    }

    const updatedOrder = this.ordersRepository.update(
      pendingOrder.id,
      pendingOrder,
    );

    return this.toCreateOrderDto(updatedOrder);
  }

  checkoutOrder(placeOrderDto: PlaceOrderDto): CreateOrderDto {
    const { orderId, discountCode } = placeOrderDto;
    const pendingOrder = this.ordersRepository.findById(orderId);
    if (!pendingOrder) {
      throw new NotFoundException('No pending order found');
    }

    if (pendingOrder.status !== OrderStatusEnum.PENDING) {
      throw new NotFoundException('Invalid order');
    }

    // Calculate total order amount, for now lets assume every order is of 100
    //TODO update the logic to get the item price from products module
    pendingOrder.totalAmount = pendingOrder.items.reduce(
      (total, item) => total + item.quantity * 100,
      0,
    );

    // Apply discount if a valid discount code is provided
    if (discountCode) {
      // assuming for now discount code is always valid
      // TODO validate discount code once discount module is created, add login for nth order as well
      pendingOrder.discountCode = discountCode;
      pendingOrder.finalAmount = pendingOrder.totalAmount * 0.9; //TODO for now taking 10% discount, update logic once discount module is created
    } else {
      pendingOrder.finalAmount = pendingOrder.totalAmount;
    }

    pendingOrder.status = OrderStatusEnum.CREATED;

    const updatedOrder = this.ordersRepository.update(
      pendingOrder.id,
      pendingOrder,
    );

    return this.toCreateOrderDto(updatedOrder);
  }

  toCreateOrderDto(order: Order): CreateOrderDto {
    return {
      orderId: order.id,
    };
  }
}
