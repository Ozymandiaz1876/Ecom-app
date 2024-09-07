import { Module } from '@nestjs/common';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { CouponsModule } from 'src/coupons/coupons.module';

@Module({
  imports: [OrdersModule, ProductsModule, CouponsModule],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
