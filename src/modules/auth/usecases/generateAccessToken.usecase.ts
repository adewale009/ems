import { Injectable, Logger } from '@nestjs/common';
import {} from '@modules/core/entities/user.entity';
import { Usecase } from '@broker/types';
import {} from '../dtos/login.dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import {} from '@nestjs/config';

@Injectable()
export class GenerateAccessTokenUsecase extends Usecase<{ accessToken: string }> {
  private readonly logger = new Logger(GenerateAccessTokenUsecase.name);

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {
    super();
  }

  async execute(
    entityManager,
    generateAccessTokenDto: { refreshToken: string },
  ): Promise<{ accessToken: string }> {
    this.logger.log('Generating access token from refresh token...');
    const token = await this.tokenService.generateAccessTokenFromRefreshToken(
      generateAccessTokenDto.refreshToken,
    );

    return { accessToken: token.accessToken };
  }
}
