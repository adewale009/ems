import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto } from '../dtos/createEmployee.dto';
import { RoleService } from '../../core/services/role.service';
import { Usecase } from '@broker/types';
import { EntityManager } from 'typeorm';

@Injectable()
export class CreateEmployeeUsecase extends Usecase {
  private readonly logger = new Logger(CreateEmployeeUsecase.name);

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly roleService: RoleService,
  ) {
    super();
  }

  async execute(entityManager: EntityManager, createEmployeeDto: CreateEmployeeDto) {
    this.logger.log('Executing CreateEmployeeUsecase');

    const roleEntity = await this.roleService.findOneById(createEmployeeDto.role);
    if (!roleEntity) {
      throw new BadRequestException(`Invalid role: ${createEmployeeDto.role}`);
    }

    const employeeData = {
      ...createEmployeeDto,
      role: roleEntity,
    };

    return this.employeeService.createEmployee(employeeData);
  }
}
