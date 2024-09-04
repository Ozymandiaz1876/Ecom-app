import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import validateConfig from '../../validators/config.validator';
import { AuthConfig } from './auth-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  AUTH_JWT_SECRET: string;

  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;
}

export default registerAs<AuthConfig>('auth', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    secret: process.env.AUTH_JWT_SECRET || 'Secret',
    expires: process.env.AUTH_JWT_TOKEN_EXPIRES_IN || '1d',
  };
});
