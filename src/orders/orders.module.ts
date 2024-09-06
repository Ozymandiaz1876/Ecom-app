import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrdersController } from './orders.controller';
import { CouponsModule } from 'src/coupons/coupons.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [forwardRef(() => CouponsModule), ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
