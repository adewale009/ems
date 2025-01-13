import { Injectable, Logger } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Usecase } from '@broker/types';

@Injectable()
export class DeleteEmployeeUsecase extends Usecase {
  private readonly logger = new Logger(DeleteEmployeeUsecase.name);

  constructor(private readonly employeeService: EmployeeService) {
    super();
  }

  async execute(id: string) {
    this.logger.log('Executing DeleteEmployeeUsecase');
    return this.employeeService.deleteEmployee(id);
  }
}
