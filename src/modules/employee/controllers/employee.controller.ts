import { Broker } from '@broker/broker';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CustomFieldValidationPipe } from '@shared/validations/custom.validation';
import { CreateEmployeeDto } from '../dtos/createEmployee.dto';
import { UpdateEmployeeDto } from '../dtos/updateEmployee.dto';
import { DeleteEmployeeDto } from '../dtos/deleteEmployee.dto';
import { FetchEmployeeDto } from '../dtos/fetchEmployee.dto';
import { AssignRoleDto } from '../dtos/assignRole.dto';
import { DeleteEmployeeUsecase } from '../usecases/deleteEmployee.usecase';
import { CreateEmployeeUsecase } from '../usecases/createEmployee.usecase';
import { UpdateEmployeeUsecase } from '../usecases/updateEmployee.usecase';
import { FetchEmployeeUsecase } from '../usecases/fetchEmployee.usecase';
import { AssignRoleToEmployeeUsecase } from '../usecases/assignRoleToEmployee.usecase';
import { AssignEmployeeToDepartmentUsecase } from '../usecases/assignEmployeeToDepartment.usecase';
import { AssignToDepartmentDto } from '../dtos/assignToDepartment.dto';

@ApiTags('Employees')
@Controller('employees/')
export class EmployeeController {
  private readonly logger = new Logger(EmployeeController.name);

  constructor(
    private readonly broker: Broker,
    private readonly createEmployeeUsecase: CreateEmployeeUsecase,
    private readonly updateEmployeeUsecase: UpdateEmployeeUsecase,
    private readonly fetchEmployeeUsecase: FetchEmployeeUsecase,
    private readonly deleteEmployeeUsecase: DeleteEmployeeUsecase,
    private readonly assignRoleToEmployeeUsecase: AssignRoleToEmployeeUsecase,
    private readonly assignEmployeeToDepartmentUsecase: AssignEmployeeToDepartmentUsecase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'createEmployee', summary: 'Create Employee' })
  @ApiOkResponse({ status: HttpStatus.CREATED })
  async createEmployee(@Body(CustomFieldValidationPipe) createEmployeeDto: CreateEmployeeDto) {
    return this.broker.runUsecases([this.createEmployeeUsecase], createEmployeeDto);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateEmployee', summary: 'Update Employee' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async updateEmployee(@Body(CustomFieldValidationPipe) updateEmployeeDto: UpdateEmployeeDto) {
    return this.broker.runUsecases([this.updateEmployeeUsecase], updateEmployeeDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'findAllEmployees', summary: 'Fetch All Employees' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async findAllEmployees(@Body(CustomFieldValidationPipe) fetchEmployeeDto: FetchEmployeeDto) {
    return this.broker.runUsecases([this.fetchEmployeeUsecase], fetchEmployeeDto);
  }

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteEmployee', summary: 'Delete Employee' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async deleteEmployee(@Body(CustomFieldValidationPipe) deleteEmployeeDto: DeleteEmployeeDto) {
    return this.broker.runUsecases([this.deleteEmployeeUsecase], deleteEmployeeDto);
  }

  @Patch(':employeeId/assign-role/:roleId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'assignRoleToEmployee', summary: 'Assign Role to Employee' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async assignRoleToEmployee(
    @Param('employeeId') employeeId: string,
    @Param('roleId') roleId: string,
    @Body(CustomFieldValidationPipe) assignRoleDto: AssignRoleDto,
  ) {
    return this.broker.runUsecases([this.assignRoleToEmployeeUsecase], {
      employeeId,
      roleId,
      ...assignRoleDto,
    });
  }

  @Patch('assign-department')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    operationId: 'assignEmployeeToDepartment',
    summary: 'Assign Employee to Department',
  })
  @ApiOkResponse({ status: HttpStatus.OK })
  async assignEmployeeToDepartment(
    @Body(CustomFieldValidationPipe) assignToDepartmentDto: AssignToDepartmentDto,
  ) {
    this.logger.log(
      `Assigning Employee ID ${assignToDepartmentDto.employeeId} to Department ID ${assignToDepartmentDto.departmentId}`,
    );
    return this.broker.runUsecases([this.assignEmployeeToDepartmentUsecase], assignToDepartmentDto);
  }
}
