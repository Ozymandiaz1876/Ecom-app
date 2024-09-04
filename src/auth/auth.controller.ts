import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';

import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    return this.service.validateLogin(loginDto);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: AuthRegisterLoginDto,
  ): Promise<LoginResponseDto> {
    return this.service.register(createUserDto);
  }
}
