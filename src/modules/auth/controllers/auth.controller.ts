import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Logger,
  Request,
  Get,
} from '@nestjs/common';
import { Broker } from '@broker/broker';
import { LoginUsecaseDto } from '../dtos/login.dto';
import { LoginUsecase } from '../usecases/login.usecase';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { addDays } from 'date-fns';
import { GenerateAccessTokenUsecase } from '../usecases/generateAccessToken.usecase';
import { Public } from '@shared/decorators/isPublic.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly broker: Broker,
    private readonly loginUsecase: LoginUsecase,
    private readonly configService: ConfigService,
    private readonly generateAccessTokenUsecase: GenerateAccessTokenUsecase,
  ) {}

  @Public()
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'signin', summary: 'Signin' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() loginRequestDto: LoginUsecaseDto,
  ) {
    const result = await this.broker.runUsecases([this.loginUsecase], loginRequestDto);

    res.cookie(
      this.configService.get<string>('common.auth.cookie.name'),
      JSON.stringify(result.refreshToken),
      {
        expires: addDays(
          new Date(),
          Number(this.configService.get<number>('common.auth.cookie.expiry')),
        ),
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'none',
      },
    );
    return result;
  }

  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'refresh-token', summary: 'Refresh Token' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async refreshToken(@Request() request) {
    const result = await this.broker.runUsecases([this.generateAccessTokenUsecase], {
      refreshToken: request.cookies[this.configService.get<string>('common.auth.cookie.name')],
    });

    return result;
  }

  @Post('/signout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'sign-out', summary: 'Sign Out' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async signOut(@Res({ passthrough: true }) res: Response, @Request() req) {
    res.clearCookie(this.configService.get<string>('common.auth.cookie.name'));
    req.logout();
    return { message: 'Signout successful' };
  }
}
