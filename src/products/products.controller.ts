import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { UserRolesEnum } from 'src/constants/enums';
import { base64Decode } from 'src/utils';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getProductById(@Param('id') id: string): Product {
    const decodedId = base64Decode(id);

    return this.productsService.getProductById(decodedId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRolesEnum.ADMIN)
  createProduct(@Body() productDto: Partial<Product>): Product {
    return this.productsService.createProduct(productDto);
  }
}
