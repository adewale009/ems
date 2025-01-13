import { IsUUID } from 'class-validator';

export class AssignToDepartmentDto {
  @IsUUID()
  employeeId: string;

  @IsUUID()
  departmentId: string;
}
