import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CouponsRepository } from './coupons.repository';
import { Coupon } from './coupons.model';
import { generate } from 'voucher-code-generator';
import { OrdersService } from 'src/orders/orders.service';
import { base64Decode } from 'src/utils';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Injectable()
export class CouponsService {
  constructor(
    private readonly couponsRepository: CouponsRepository,
    private readonly ordersService: OrdersService,
  ) {}

  validateCoupon(
    couponCode: string,
    orderId: string,
  ): { discount: number; isValid: boolean } {
    const coupon = this.couponsRepository.findOneByCode(couponCode);

    const order = this.ordersService.getOrderById(orderId);
    const orderNumber = order.orderNumber;

    const currentTime = Date.now();

    if (coupon.expiration < currentTime) {
      return { discount: 0, isValid: false };
    }

    // coupon can be applied only to nth order
    if (orderNumber % coupon.nthOrderValidity !== 0) {
      return { discount: 0, isValid: false };
    }

    return { discount: coupon.discountPercent, isValid: true };
  }

  createCoupon(couponDto: CreateCouponDto): Coupon {
    if (!couponDto.couponCode) {
      // if not coupon code passed, generate one
      const [voucher] = generate({ length: 8, count: 1 });
      couponDto.couponCode = voucher;
    }

    if (couponDto.discountPercent > 100 || couponDto.discountPercent <= 0) {
      throw new UnprocessableEntityException(
        'Discount percent must be between 1 and 100.',
      );
    }

    if (!couponDto.expiration) {
      // Default expiration: 30 days from now
      couponDto.expiration = Date.now() + 30 * 24 * 60 * 60 * 1000;
    }

    // if no order nmumber passed, coupon will be applied to every 10th order
    if (!couponDto.nthOrderValidity) {
      couponDto.nthOrderValidity = 10;
    }
    const coupon = this.couponsRepository.create(couponDto);

    return {
      ...coupon,
      id: base64Decode(coupon.id),
    };
  }
}
