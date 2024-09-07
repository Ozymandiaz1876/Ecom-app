import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  public id: string;

  @ApiProperty({ example: 'test1@example.com', type: String })
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'john', type: String })
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty({ example: 'doe', type: String })
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty({
    allOf: [{ $ref: 'src/constants/enums/UserRoles.enum.ts' }],
    type: String,
  })
  @IsOptional()
  public role?: string;

  @ApiProperty({
    allOf: [{ $ref: 'src/constants/enums/UserStatus.enum.ts' }],
    type: String,
  })
  @IsOptional()
  public status?: string;
}
