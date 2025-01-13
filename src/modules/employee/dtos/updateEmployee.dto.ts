import { IsString, IsEmail, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto {
  @ApiProperty({ description: 'First name of the employee', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ description: 'Last name of the employee', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ description: 'Email of the employee', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Phone number of the employee', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ description: 'Role ID of the employee', required: false })
  @IsOptional()
  @IsUUID()
  roleId?: string;

  @ApiProperty({ description: 'Department ID of the employee', required: false })
  @IsOptional()
  @IsUUID()
  departmentId?: string;
}
