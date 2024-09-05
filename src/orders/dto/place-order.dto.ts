import { IsNotEmpty, IsString } from 'class-validator';

export class PlaceOrderDto {
  @IsString()
  @IsNotEmpty()
  public orderId: string;

  @IsString()
  @IsNotEmpty()
  public discountCode: string;
}
