import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsUUID } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Phone number of the employee', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({ description: 'Department ID of the employee', required: false })
  @IsOptional()
  @IsUUID()
  departmentId?: string;
}
