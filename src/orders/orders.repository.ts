import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './orders.model';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatusEnum } from 'src/constants/enums/OrderStatus.enum';

@Injectable()
export class OrdersRepository {
  private orders: Order[] = [];
  private currentOrderNumber = 0;

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: string): Order {
    return this.orders.find((order) => order.id === id);
  }
  findById(id: string): Order {
    const order = this.orders.find((order) => order.id === id);
    return order;
  }

  findByUserId(userId: string): Order[] {
    return this.orders.filter((order) => order.userId === userId);
  }

  create(orderDto: Partial<Order>): Order {
    const newOrder = new Order({
      id: uuidv4(),
      ...orderDto,
      status: OrderStatusEnum.PENDING,
      orderNumber: ++this.currentOrderNumber,
    });
    this.orders.push(newOrder);
    return newOrder;
  }

  update(id: string, updateOrderDto: Partial<Order>): Order {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    const updatedOrder = {
      ...this.orders[orderIndex],
      ...updateOrderDto,
    };
    this.orders[orderIndex] = updatedOrder;
    return updatedOrder;
  }

  delete(id: string): boolean {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    this.orders.splice(orderIndex, 1);
    return true;
  }
}
