import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

@Injectable()
export class LoginUsecaseDto {
  @ApiProperty({ type: 'string', example: 'johndoe@email.com', description: 'Email of the user' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', example: 'password', description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
