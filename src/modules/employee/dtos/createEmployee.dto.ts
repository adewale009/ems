import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsUUID } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'FirstName of the employee', required: false })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'LastName of the employee', required: false })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email of the employee', required: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password of the employee', required: false })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Phone number of the employee', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ description: 'Role of the employee', required: false })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({ description: 'Department ID of the employee', required: false })
  @IsOptional()
  @IsUUID()
  departmentId?: string;
}
