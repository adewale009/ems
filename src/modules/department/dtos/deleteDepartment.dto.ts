import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteDepartmentDto {
  @ApiProperty({ description: 'ID of the department to delete' })
  @IsUUID()
  id: string;
}
