import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ValidCouponDto {
  @IsNumber()
  @IsNotEmpty()
  public discountAmount: number;

  @IsBoolean()
  @IsNotEmpty()
  public isValid: boolean;
}
