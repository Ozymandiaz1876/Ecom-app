import { IsNotEmpty, IsString } from 'class-validator';

export class PlaceOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  discountCode: string;
}
