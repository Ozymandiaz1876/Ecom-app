import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [];

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
