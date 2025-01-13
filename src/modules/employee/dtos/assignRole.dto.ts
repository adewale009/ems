import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
  @ApiProperty({ description: 'Employee ID' })
  @IsUUID()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({ description: 'Role ID' })
  @IsUUID()
  @IsNotEmpty()
  roleId: string;
}
