import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@Injectable()
export class SigninDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'bugbite42@gmail.com',
    description: 'Email of the account owner',
  })
  email: string;

  @ApiProperty({ type: 'string', example: 'password', description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
