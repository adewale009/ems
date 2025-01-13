import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListPropertyDto } from '../dtos/listProperty.dto';
import { CustomFieldValidationPipe } from '@shared/validations/custom.validation';
import { Broker } from '@broker/broker';
import { ListPropertyUsecase } from '../usecases/listProperty.usecase';
import { JwtAuthGuard } from '@modules/auth/guards/jwtAuth.guard';

@ApiTags('Property')
@UseGuards(JwtAuthGuard)
@Controller('properties')
export class PropertiesController {
  private readonly logger = new Logger(PropertiesController.name);

  constructor(
    private readonly serviceBroker: Broker,
    private readonly listPropertyUsecase: ListPropertyUsecase,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'listProperty', summary: 'List a property' })
  @ApiOkResponse({ status: HttpStatus.OK })
  listProperty(@Req() req, @Body(CustomFieldValidationPipe) listPropertyDto: ListPropertyDto) {
    return this.serviceBroker.runUsecases([this.listPropertyUsecase], {
      listingDto: listPropertyDto,
      user: req.user,
    });
  }
}
