import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [];

  constructor() {
    // seed 10 products
    for (let i = 0; i < 10; i++) {
      this.products.push({
        id: uuidv4(),
        name: `Product ${i}`,
        description: `Description ${i}`,
        price: i * 100,
        pictures: [`https://picsum.photos/id/${i}/200/300`],
      });
    }
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  create(productDto: Partial<Product>): Product {
    const newProduct = new Product({
      id: uuidv4(),
      ...productDto,
    });
    this.products.push(newProduct);
    return newProduct;
  }
}
