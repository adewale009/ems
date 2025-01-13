import { Injectable, Logger } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../../core/entities/employee.entity';
import { Usecase } from '@broker/types';

@Injectable()
export class FetchEmployeeUsecase extends Usecase {
  private readonly logger = new Logger(FetchEmployeeUsecase.name);

  constructor(private readonly employeeService: EmployeeService) {
    super();
  }

  async execute(id?: string): Promise<Employee | Employee[]> {
    if (id) {
      this.logger.log(`Fetching employee with ID: ${id}`);
      return this.employeeService.findEmployeeById(id);
    }
    this.logger.log('Fetching all employees');
    return this.employeeService.findAllEmployees();
  }
}
