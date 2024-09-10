import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { Coupon } from './coupons.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { UserRolesEnum } from 'src/constants/enums';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRolesEnum.ADMIN)
  getAllCoupons(): Coupon[] {
    return this.couponsService.getAllCoupons();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRolesEnum.ADMIN)
  createCoupon(@Body() couponDto: CreateCouponDto): Coupon {
    return this.couponsService.createCoupon(couponDto);
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  validateCoupon(
    @Query('couponCode') couponCode: string,
    @Query('orderId') orderId: string,
  ): { discount: number; isValid: boolean } {
    return this.couponsService.validateCoupon(couponCode, orderId);
  }
}
