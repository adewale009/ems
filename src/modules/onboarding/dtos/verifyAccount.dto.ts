import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: '123456', description: 'The OTP sent to the user email' })
  otp: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'adewale@gmail.com',
    description: 'Email of the account owner',
  })
  email: string;
}
