import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, /*IsString,*/ IsUUID } from 'class-validator';

export class FetchDepartmentDto {
  @ApiPropertyOptional({ description: 'Filter departments by name' })
  @IsOptional()
  // @IsString()
  @IsUUID()
  id?: string;

  // name?: string;
  // limit?: number;
  // page?: number;
}
