import { Injectable, NotFoundException } from '@nestjs/common';
import { Coupon } from './coupons.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CouponsRepository {
  private coupons: Coupon[] = [];

  findOneByCode(couponCode: string): Coupon {
    const coupon = this.coupons.find(
      (coupon) => coupon.couponCode === couponCode,
    );
    if (!coupon) {
      throw new NotFoundException(`Coupon with code ${couponCode} not found`);
    }
    return coupon;
  }

  create(couponDto: Partial<Coupon>): Coupon {
    const newCoupon = new Coupon({
      id: uuidv4(),
      ...couponDto,
    });
    this.coupons.push(newCoupon);
    return newCoupon;
  }
}
