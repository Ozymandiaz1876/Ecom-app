import { Controller, Get, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { UserRolesEnum } from 'src/constants/enums';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('summary')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRolesEnum.ADMIN)
  getSalesSummary() {
    return this.salesService.getSalesSummary();
  }
}
