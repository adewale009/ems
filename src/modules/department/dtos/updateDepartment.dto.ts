import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDepartmentDto {
  @ApiProperty({ description: 'Department ID' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Name of the department', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Description of the department', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
