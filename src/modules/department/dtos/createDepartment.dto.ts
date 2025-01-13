import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Name of the department' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the department', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
