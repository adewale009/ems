import { Injectable, Logger } from '@nestjs/common';
import { User } from '@modules/core/entities/user.entity';
import { Usecase } from '@broker/types';
import { LoginUsecaseDto } from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginUsecase extends Usecase<User> {
  private readonly logger = new Logger(LoginUsecase.name);

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async execute(entityManager, loginUsecaseDto: LoginUsecaseDto): Promise<any> {
    const user = await this.authService.authenticate(loginUsecaseDto);
    delete user.password;
    const tokens = await this.tokenService.generateAuthToken(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phoneNumber: user.phoneNumber,
        lastLoginAt: user.lastLoginAt,
      },
    };
  }
}
