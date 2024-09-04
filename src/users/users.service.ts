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
import { base64Encode } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

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

    return this.usersRepository.create(userDto);
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
      id: base64Encode(user.id),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      status: user.status,
    };
  }
}
