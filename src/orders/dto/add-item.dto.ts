import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddItemDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsNumber()
  quantity: number;

  // only need one of these, for adding first item, need userId, after that orderId
  @IsString()
  orderId?: string;

  @IsString()
  userId?: string;
}
