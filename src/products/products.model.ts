export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  pictures: string[];

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
