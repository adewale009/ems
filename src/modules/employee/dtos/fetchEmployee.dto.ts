import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FetchEmployeeDto {
  @ApiPropertyOptional({ description: 'Filter employees by name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Filter employees by department' })
  @IsOptional()
  @IsString()
  departmentId?: string;
}
