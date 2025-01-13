import { Injectable, Logger } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { UpdateEmployeeDto } from '../dtos/updateEmployee.dto';
import { Usecase } from '@broker/types';

@Injectable()
export class UpdateEmployeeUsecase extends Usecase {
  private readonly logger = new Logger(UpdateEmployeeUsecase.name);

  constructor(private readonly employeeService: EmployeeService) {
    super();
  }

  async execute(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    this.logger.log('Executing UpdateEmployeeUsecase');
    return this.employeeService.updateEmployee(id, updateEmployeeDto);
  }
}
