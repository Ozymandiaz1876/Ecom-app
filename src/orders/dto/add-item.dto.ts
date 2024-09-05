import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddItemDto {
  @IsString()
  @IsNotEmpty()
  public itemId: string;

  @IsNumber()
  public quantity: number;

  // only need one of these, for adding first item, need userId, after that orderId
  @IsString()
  public orderId?: string;

  @IsString()
  public userId?: string;
}
