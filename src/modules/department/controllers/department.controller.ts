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
  UseGuards,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CustomFieldValidationPipe } from '@shared/validations/custom.validation';
import { CreateDepartmentDto } from '../dtos/createDepartment.dto';
import { UpdateDepartmentDto } from '../dtos/updateDepartment.dto';
import { DeleteDepartmentDto } from '../dtos/deleteDepartment.dto';
import { DeleteDepartmentUsecase } from '../usecases/deleteDepartment.usecase';
import { CreateDepartmentUsecase } from '../usecases/createDepartment.usecase';
import { UpdateDepartmentUsecase } from '../usecases/updateDepartment.usecase';
import { FetchDepartmentUsecase } from '../usecases/fetchDepartment.usecase';
import { Public } from '@shared/decorators/isPublic.decorator';
import { AuthorizationGuard } from '@shared/guards/authorization.guard';
import { FetchAllDepartmentsUsecase } from '../usecases/fetchAllDepartmentsUsecase';
import { FetchAllDepartmentsDto } from '../dtos/FetchAllDepartmentsDto';

@ApiTags('Departments')
@Controller('departments/')
export class DepartmentController {
  private readonly logger = new Logger(DepartmentController.name);

  constructor(
    private readonly broker: Broker,
    private readonly createDepartmentUsecase: CreateDepartmentUsecase,
    private readonly updateDepartmentUsecase: UpdateDepartmentUsecase,
    private readonly fetchDepartmentUsecase: FetchDepartmentUsecase,
    private readonly deleteDepartmentUsecase: DeleteDepartmentUsecase,
    private readonly fetchAllDepartmentsUsecase: FetchAllDepartmentsUsecase,
  ) {}

  @Public()
  @UseGuards(AuthorizationGuard)
  @Post('create-department')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'createDepartment', summary: 'Create Department' })
  @ApiOkResponse({ status: HttpStatus.CREATED })
  async createDepartment(
    @Body(CustomFieldValidationPipe) createDepartmentDto: CreateDepartmentDto,
  ) {
    return this.broker.runUsecases([this.createDepartmentUsecase], createDepartmentDto);
  }

  @Public()
  @Patch('update-department')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'updateDepartment', summary: 'Update Department' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async updateDepartment(
    @Body(CustomFieldValidationPipe) updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.broker.runUsecases([this.updateDepartmentUsecase], updateDepartmentDto);
  }

  @Public()
  @Get('department-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'findAllDepartments', summary: 'Fetch All Departments' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async findAllDepartments(
    @Query(CustomFieldValidationPipe) fetchAllDepartmentsDto: FetchAllDepartmentsDto,
  ) {
    return this.broker.runUsecases([this.fetchAllDepartmentsUsecase], fetchAllDepartmentsDto);
  }

  @Public()
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'findDepartmentById', summary: 'Fetch Department by ID' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async findDepartmentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.broker.runUsecases([this.fetchDepartmentUsecase], { id });
  }

  @Public()
  @Delete('delete-department')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'deleteDepartment', summary: 'Delete Department' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async deleteDepartment(
    @Body(CustomFieldValidationPipe) deleteDepartmentDto: DeleteDepartmentDto,
  ) {
    return this.broker.runUsecases([this.deleteDepartmentUsecase], deleteDepartmentDto);
  }
}
