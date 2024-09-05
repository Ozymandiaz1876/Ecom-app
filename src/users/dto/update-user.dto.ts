import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, MinLength } from 'class-validator';

import { lowerCaseTransformer } from '../../utils';

export class UpdateUserDto {
  @Transform(lowerCaseTransformer)
  @IsOptional()
  @IsEmail()
  public email?: string;

  @IsOptional()
  @MinLength(6)
  public password?: string;

  @IsOptional()
  public firstName?: string;

  @IsOptional()
  public lastName?: string;

  @IsOptional()
  public role?: string;

  @IsOptional()
  public status: string;
}
