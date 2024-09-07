import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import authConfig from './auth/config/auth.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CouponsModule } from './coupons/coupons.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
      envFilePath: ['.env'],
    }),
    UsersModule,
    AuthModule,
    CouponsModule,
    OrdersModule,
    ProductsModule,
    SalesModule,
  ],
})
export class AppModule {}
