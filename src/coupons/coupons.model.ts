export class Coupon {
  id: string;
  couponCode: string;
  expiration: number;
  discountPercent: number;
  nthOrderValidity: number;

  constructor(partial: Partial<Coupon>) {
    Object.assign(this, partial);
  }
}
