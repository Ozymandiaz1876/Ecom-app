import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { AllConfigType } from '../config/config.type';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
    const user = this.usersService.getUserByEmail(loginDto.email);

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          email: 'notFound',
        },
      });
    }

    if (!user.password) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'incorrectPassword',
        },
      });
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'incorrectPassword',
        },
      });
    }

    const { token, tokenExpires } = await this.getTokensData({
      sub: user.id,
      role: user.role,
      email: user.email,
    });

    return this.toLoginReponseDto(token, tokenExpires, user);
  }

  async register(dto: AuthRegisterLoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.createUser({
      ...dto,
      email: dto.email,
    });
    return await this.validateLogin({
      email: user.email,
      password: dto.password,
    });
  }

  private async getTokensData(data: {
    sub: User['id'];
    role: User['role'];
    email: User['email'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const token = await this.jwtService.signAsync(
      {
        sub: data.sub,
        role: data.role,
        email: data.email,
      },
      {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
        expiresIn: tokenExpiresIn,
      },
    );

    return {
      token,
      tokenExpires,
    };
  }
  toLoginReponseDto(
    token: string,
    tokenExpires: number,
    userData: User,
  ): LoginResponseDto {
    const { id, email, firstName, lastName, role, status } = userData;

    return {
      token,
      tokenExpires,
      user: {
        id,
        email,
        firstName,
        lastName,
        role,
        status,
      },
    };
  }
}
