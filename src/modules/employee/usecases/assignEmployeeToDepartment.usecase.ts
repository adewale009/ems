import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Usecase } from '@broker/types';

@Injectable()
export class AssignEmployeeToDepartmentUsecase extends Usecase {
  private readonly logger = new Logger(AssignEmployeeToDepartmentUsecase.name);

  constructor(private readonly employeeService: EmployeeService) {
    super();
  }

  /**
   * Executes the assignEmployeeToDepartment use case
   * @param employeeId - The employee's ID
   * @param departmentId - The department's ID
   */
  async execute(employeeId: string, departmentId: string) {
    this.logger.log(`Executing AssignEmployeeToDepartmentUsecase for Employee ${employeeId}`);

    if (!employeeId || !departmentId) {
      throw new BadRequestException('Employee ID and Department ID are required.');
    }

    return this.employeeService.assignEmployeeToDepartment(employeeId, departmentId);
  }
}
