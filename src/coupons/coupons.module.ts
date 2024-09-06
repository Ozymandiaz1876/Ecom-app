import { forwardRef, Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { CouponsRepository } from './coupons.repository';
import { CouponsService } from './coupons.service';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [forwardRef(() => OrdersModule)],
  controllers: [CouponsController],
  providers: [CouponsRepository, CouponsService],
  exports: [CouponsService],
})
export class CouponsModule {}
