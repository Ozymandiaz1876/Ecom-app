import { OrderStatusEnum } from 'src/constants/enums/OrderStatus.enum';

export class Order {
  id: string;
  userId: string;
  items: { itemId: string; quantity: number }[];
  totalAmount: number;
  discountCode?: string;
  finalAmount: number;
  status: OrderStatusEnum;
  orderNumber: number;

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}
