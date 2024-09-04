import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../jwt-payload.interface';

export const PayloadData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
