import { Injectable } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { CouponsService } from '../coupons/coupons.service';
import { PurchasedItemCountDto } from './dto/purchased-item-count.dto';

@Injectable()
export class SalesService {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly couponsService: CouponsService,
  ) {}

  getTotalItemsCount(): PurchasedItemCountDto {
    const orders = this.ordersService.getAllOrders();
    const itemsPurchased: PurchasedItemCountDto = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!itemsPurchased[item.itemId]) {
          itemsPurchased[item.itemId] = {
            ...this.productsService.getProductById(item.itemId),
            quantity: 0,
          };
        }
        itemsPurchased[item.itemId].quantity += item.quantity;
      });
    });
    return itemsPurchased;
  }

  getTotalPurchaseAmount(): number {
    const orders = this.ordersService.getAllOrders();
    return orders.reduce((total, order) => {
      const orderTotal = order.items.reduce((sum, item) => {
        const product = this.productsService.getProductById(item.itemId);
        return sum + product.price * item.quantity;
      }, 0);
      return total + orderTotal;
    }, 0);
  }

  getTotalDiscountAmount(): number {
    const orders = this.ordersService.getAllOrders();
    return orders.reduce((total, order) => {
      if (order.discountCode) {
        const { discount } = this.couponsService.validateCoupon(
          order.discountCode,
          order.id,
        );
        const orderTotal = order.items.reduce((sum, item) => {
          const product = this.productsService.getProductById(item.itemId);
          return sum + product.price * item.quantity;
        }, 0);
        return total + (orderTotal * discount) / 100;
      }
      return total;
    }, 0);
  }

  getSalesSummary() {
    return {
      totalItemsCount: this.getTotalItemsCount(),
      totalPurchaseAmount: this.getTotalPurchaseAmount(),
      totalDiscountAmount: this.getTotalDiscountAmount(),
    };
  }
}
