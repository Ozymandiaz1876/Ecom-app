import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';
import { UserRolesEnum, UserStatusEnum } from 'src/constants/enums';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {
    // seed user and admin user
    this.createUser({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@email.com',
      password: 'admin',
      role: UserRolesEnum.ADMIN,
      status: UserStatusEnum.ACTIVE,
    });
    this.createUser({
      firstName: 'user',
      lastName: 'user',
      email: 'user@email.com',
      password: 'password',
      role: UserRolesEnum.USER,
      status: UserStatusEnum.ACTIVE,
    });
  }

  getAllUsers(): User[] {
    return this.usersRepository.findAll();
  }

  getUserById(id: string): User {
    const user = this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  getUsersByProperty(property: keyof User, value: any): User[] {
    return this.usersRepository.findBy(property, value);
  }

  getUserByEmail(email: string): User {
    const user = this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async createUser(userDto: Partial<User>): Promise<User> {
    const incomingPayloadClone = { ...userDto };

    if (!incomingPayloadClone.email) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { email: 'emailRequired' },
      });
    }

    if (!incomingPayloadClone.password) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { password: 'passwordRequired' },
      });
    }

    // Check if email already exists
    const userObject = this.usersRepository.findByEmail(
      incomingPayloadClone.email,
    );

    if (userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { email: 'emailAlreadyExists' },
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    incomingPayloadClone.password = await bcrypt.hash(
      incomingPayloadClone.password,
      salt,
    );
    incomingPayloadClone.status = UserStatusEnum.ACTIVE;

    if (!incomingPayloadClone.role) {
      incomingPayloadClone.role = UserRolesEnum.USER;
    }

    return this.usersRepository.create(incomingPayloadClone);
  }

  updateUser(id: string, updateUserDto: Partial<User>): User {
    return this.usersRepository.update(id, updateUserDto);
  }

  deleteUser(id: string): boolean {
    return this.usersRepository.delete(id);
  }

  // Convert user object to UserDto
  toUserDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
    };
  }
}
