import { IsEmail, IsOptional, IsString } from 'class-validator';

class sendingUser {
  @IsString()
  public id: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsOptional()
  public role?: string;

  @IsString()
  @IsOptional()
  public status?: string;
}

export class LoginResponseDto {
  @IsString()
  public token: string;

  public tokenExpires: number;

  public user: sendingUser;
}
