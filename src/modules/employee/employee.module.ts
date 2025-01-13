import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';
import { EmployeeRepository } from '@adapters/repositories/employee.repository';
import { Employee } from '../core/entities/employee.entity';
import { CreateEmployeeUsecase } from './usecases/createEmployee.usecase';
import { UpdateEmployeeUsecase } from './usecases/updateEmployee.usecase';
import { FetchEmployeeUsecase } from './usecases/fetchEmployee.usecase';
import { DeleteEmployeeUsecase } from './usecases/deleteEmployee.usecase';
import { DepartmentModule } from '../department/department.module';
import { CoreModule } from '../core/core.module';
import { Broker } from 'src/broker/broker';
import { RoleService } from '@modules/core/services/role.service';
import { AssignEmployeeToDepartmentUsecase } from './usecases/assignEmployeeToDepartment.usecase';
import { AssignRoleToEmployeeUsecase } from './usecases/assignRoleToEmployee.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    forwardRef(() => DepartmentModule),
    forwardRef(() => CoreModule),
  ],
  controllers: [EmployeeController],
  providers: [
    Broker,
    EmployeeService,
    RoleService,
    EmployeeRepository,
    CreateEmployeeUsecase,
    AssignEmployeeToDepartmentUsecase,
    AssignRoleToEmployeeUsecase,
    UpdateEmployeeUsecase,
    FetchEmployeeUsecase,
    DeleteEmployeeUsecase,
  ],
  exports: [
    EmployeeService,
    RoleService,
    EmployeeRepository,
    CreateEmployeeUsecase,
    AssignEmployeeToDepartmentUsecase,
    AssignRoleToEmployeeUsecase,
    UpdateEmployeeUsecase,
    FetchEmployeeUsecase,
    DeleteEmployeeUsecase,
  ],
})
export class EmployeeModule {}
