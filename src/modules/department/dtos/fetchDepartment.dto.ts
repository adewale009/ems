import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FetchDepartmentDto {
  @ApiPropertyOptional({ description: 'Filter departments by name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Filter departments by location' })
  @IsOptional()
  @IsString()
  location?: string;
}
