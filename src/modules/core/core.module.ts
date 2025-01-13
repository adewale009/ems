import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { OtpCode } from './entities/otp.entity';
import { Role } from './entities/role.entity';
import { RoleRepository } from '@adapters/repositories/role.repository';
import { UserRepository } from '@adapters/repositories/user.repository';
import { OtpCodeRepository } from '@adapters/repositories/otp.repository';
import { RoleService } from './services/role.service';
import { FetchRolesUsecase } from './usecases/fetchRoles.usecase';
import { EmployeeModule } from '@modules/employee/employee.module';
import { RoleController } from './controllers/roles.controller';
import { DepartmentModule } from '@modules/department/department.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, OtpCode]), EmployeeModule, DepartmentModule],
  providers: [
    // Repositories
    RoleRepository,
    UserRepository,
    OtpCodeRepository,
    DepartmentModule,
    EmployeeModule,
    // Services
    RoleService,
    // UseCases
    FetchRolesUsecase,
  ],
  controllers: [RoleController],
  exports: [
    // Repositories
    RoleRepository,
    UserRepository,
    OtpCodeRepository,
    DepartmentModule,
    EmployeeModule,
    // Services
    RoleService,
    // UseCases
    FetchRolesUsecase,
  ],
})
export class CoreModule {}
