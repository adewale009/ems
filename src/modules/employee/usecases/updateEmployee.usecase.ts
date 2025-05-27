import { Injectable, Logger } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { UpdateEmployeeDto } from '../dtos/updateEmployee.dto';
import { Usecase } from '@broker/types';
import { EntityManager } from 'typeorm';

@Injectable()
export class UpdateEmployeeUsecase extends Usecase {
  private readonly logger = new Logger(UpdateEmployeeUsecase.name);

  constructor(private readonly employeeService: EmployeeService) {
    super();
  }

  async execute(entityManager: EntityManager, updateEmployeeDto: UpdateEmployeeDto) {
    this.logger.log('Executing UpdateEmployeeUsecase');

    const employeeData = {
      ...updateEmployeeDto,
    };

    return this.employeeService.createEmployee(employeeData);
  }
}
