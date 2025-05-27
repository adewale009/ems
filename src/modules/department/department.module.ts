import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentController } from './controllers/department.controller';
import { DepartmentService } from './services/department.service';
import { DepartmentRepository } from '@adapters/repositories/department.repository';
// import { Department } from '../core/entities/department.entity';
import { Department } from '@modules/core/entities/department.entity';
import { CreateDepartmentUsecase } from './usecases/createDepartment.usecase';
import { UpdateDepartmentUsecase } from './usecases/updateDepartment.usecase';
import { FetchDepartmentUsecase } from './usecases/fetchDepartment.usecase';
import { DeleteDepartmentUsecase } from './usecases/deleteDepartment.usecase';
import { Broker } from 'src/broker/broker';
import { EmployeeModule } from '@modules/employee/employee.module';
import { CoreModule } from '@modules/core/core.module';
import { FetchAllDepartmentsUsecase } from './usecases/fetchAllDepartmentsUsecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department]),
    forwardRef(() => EmployeeModule),
    forwardRef(() => CoreModule),
  ],
  controllers: [DepartmentController],
  providers: [
    Broker,
    DepartmentService,
    DepartmentRepository,
    CreateDepartmentUsecase,
    UpdateDepartmentUsecase,
    FetchDepartmentUsecase,
    DeleteDepartmentUsecase,
    FetchAllDepartmentsUsecase,
  ],
  exports: [
    DepartmentService,
    DepartmentRepository,
    CreateDepartmentUsecase,
    UpdateDepartmentUsecase,
    FetchDepartmentUsecase,
    DeleteDepartmentUsecase,
    FetchAllDepartmentsUsecase,
  ],
})
export class DepartmentModule {}
