import { Injectable, NotFoundException } from '@nestjs/common';
import { Coupon } from './coupons.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CouponsRepository {
  private coupons: Coupon[] = [];

  constructor() {
    // seed 10 coupons
    for (let i = 0; i < 10; i++) {
      const coupon = new Coupon({
        id: uuidv4(),
        couponCode: `coupon${i}`,
        expiration: Date.now() + 30 * 24 * 60 * 60 * 1000,
        discountPercent: 10,
        nthOrderValidity: 10,
      });
      this.coupons.push(coupon);
    }
  }

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
  findAll(): Coupon[] {
    return this.coupons;
  }
}
