import { ApiProperty } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsUUID, MinLength } from 'class-validator';

@Injectable()
export class SignupDto {
  @ApiProperty({ type: 'string', example: 'John', description: 'First name of the user' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ type: 'string', example: 'Doe', description: 'Last name of the user' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ type: 'string', example: 'johndoe@email.com', description: 'Email of the user' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', example: '1234567890', description: 'Phone number of the user' })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('NG')
  phoneNumber: string;

  @ApiProperty({ type: 'string', example: 'password', description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ type: 'string', example: 'roleId', description: 'Role ID of the user' })
  @IsUUID()
  @IsNotEmpty()
  roleId: string;
}
