import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './products.model';
@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getAllProducts(): Product[] {
    const products = this.productsRepository.findAll();
    return products.map((product) => {
      return {
        ...product,
        id: product.id,
      };
    });
  }

  getProductById(id: string): Product {
    const product = this.productsRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  createProduct(productDto: Partial<Product>): Product {
    return this.productsRepository.create(productDto);
  }
}
