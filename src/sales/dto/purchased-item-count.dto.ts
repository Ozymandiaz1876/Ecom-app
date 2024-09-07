import { Product } from 'src/products/products.model';

class PurchasedItemDto extends Product {
  quantity: number;
}

export class PurchasedItemCountDto {
  [productId: string]: PurchasedItemDto;
}
