import { SetMetadata } from '@nestjs/common';
import { UserRolesEnum } from '../../constants/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRolesEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
