import { Broker } from '@broker/broker';
import { FetchRolesUsecase } from '@modules/core/usecases/fetchRoles.usecase';
import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Public } from '@shared/decorators/isPublic.decorator';

@Controller('utils')
export class UtilsController {
  private readonly logger = new Logger(UtilsController.name);

  constructor(
    private readonly serviceBroker: Broker,
    private readonly createExpenseReportUsecase: FetchRolesUsecase,
  ) {}

  @Public()
  @Get('roles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'fetchRoles', summary: 'Fetch all roles' })
  @ApiOkResponse({ status: HttpStatus.OK })
  @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  fetchRoles() {
    this.logger.log('Fetching roles');
    return this.serviceBroker.runUsecases([this.createExpenseReportUsecase]);
  }
}
