import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { lowerCaseTransformer } from '../../utils';

export class CreateUserDto {
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @MinLength(6)
  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public irstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsOptional()
  public role?: string;

  @IsOptional()
  public status?: string;
}
