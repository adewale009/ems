import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDepartmentDto {
  @ApiProperty({ description: 'Name of the department', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Description of the department', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
