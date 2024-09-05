import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  public id: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsOptional()
  public role?: string;

  @IsOptional()
  public status?: string;
}
