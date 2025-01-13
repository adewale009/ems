import { Injectable, Logger } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { AssignRoleDto } from '../dtos/assignRole.dto';
import { Usecase } from '@broker/types';

@Injectable()
export class AssignRoleToEmployeeUsecase extends Usecase {
  private readonly logger = new Logger(AssignRoleToEmployeeUsecase.name);

  constructor(private readonly employeeService: EmployeeService) {
    super();
  }

  async execute(assignRoleDto: AssignRoleDto) {
    this.logger.log('Executing AssignRoleToEmployeeUsecase');

    const { employeeId, roleId } = assignRoleDto;

    // Delegate to EmployeeService
    return this.employeeService.assignRoleToEmployee(employeeId, roleId);
  }
}
