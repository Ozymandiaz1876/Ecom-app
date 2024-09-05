import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty()
  @IsString()
  public couponCode: string;

  @IsNotEmpty()
  @IsNumber()
  public discountPercent: number;

  @IsNotEmpty()
  public expiration: Date;

  @IsNumber()
  nthOrderValidity: number;
}
