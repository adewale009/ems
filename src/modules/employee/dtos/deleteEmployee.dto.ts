import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteEmployeeDto {
  @ApiProperty({ description: 'ID of the employee to delete' })
  @IsUUID()
  id: string;
}
