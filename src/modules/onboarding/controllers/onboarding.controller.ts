import { Broker } from '@broker/broker';
import { Body, Controller, HttpCode, HttpStatus, Logger, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignupUsecase } from '../usecases/signUp.usecase';
import { SignupDto } from '../dtos/signUp.dto';
import { CustomFieldValidationPipe } from '@shared/validations/custom.validation';
import { VerifyAccountDto } from '../dtos/verifyAccount.dto';
import { VerifyAccountUsecase } from '../usecases/verifyAccount.usecase';
import { Public } from '@shared/decorators/isPublic.decorator';

@ApiTags('Onboarding')
@Controller('accounts/')
export class OnboardingController {
  private readonly logger = new Logger(OnboardingController.name);

  constructor(
    private readonly serviceBroker: Broker,
    private readonly signupUsecase: SignupUsecase,
    private readonly verifyAccountUsecase: VerifyAccountUsecase,
  ) {}

  @Public()
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'signup', summary: 'Signup' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Signup successful.' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Signup successful.' })
  signup(@Body(CustomFieldValidationPipe) signUpDto: SignupDto) {
    return this.serviceBroker.runUsecases([this.signupUsecase], signUpDto);
  }

  @Public()
  @Public()
  @Patch('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'verifyAccount', summary: 'verify account' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Account successfully verified.' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Account successfully verified.' })
  verify(@Body(CustomFieldValidationPipe) verifyAccountDto: VerifyAccountDto) {
    return this.serviceBroker.runUsecases([this.verifyAccountUsecase], verifyAccountDto);
  }
}
