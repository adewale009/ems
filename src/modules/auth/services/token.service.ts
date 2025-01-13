import { UserRepository } from '@adapters/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@modules/core/entities/user.entity';
import { TokenGeneratorUtil } from '@shared/utils/encryption/token.util';
import { SessionRepository } from '@adapters/repositories/session.repository';
import { RandomnessUtil } from '@shared/utils/encryption/randomness.util';

export type Token = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenGeneratorUtil: TokenGeneratorUtil,
    private readonly sessionRepository: SessionRepository,
    private readonly randomnessUtil: RandomnessUtil,
  ) {}

  async generateAuthToken(user: User): Promise<Token> {
    await this.userRepository.update(user.id, {
      lastLoginAt: new Date(),
    });
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  async generateRefreshToken(user: User): Promise<string> {
    const session = await this.sessionRepository.create({
      refreshToken: `${this.configService.get('common.auth.refreshToken.prefix')}${this.randomnessUtil.generateSecureToken(
        this.configService.get('common.auth.refreshToken.length'),
      )}`,
      userId: user.id,
      expiresAt: new Date(
        Date.now() + this.configService.get<number>('common.auth.refreshToken.expirationTime'),
      ),
    });
    return session.refreshToken;
  }

  generateAccessToken(user: Partial<User>): string {
    const payload = {
      id: user.id,
      roleId: user.roleId,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('common.auth.jwt.secret'),
      expiresIn: this.configService.get<string>('common.auth.jwt.expiry'),
    });
  }

  async generateAccessTokenFromRefreshToken(refreshToken: string) {
    const token = await this.sessionRepository.getSessionByToken(refreshToken);

    if (!token) {
      throw new UnauthorizedException('Session not found');
    }

    if (token.isRevoked || token.expiresAt < new Date()) {
      throw new UnauthorizedException('Session revoked or expired, login to continue');
    }

    return await this.generateAuthToken(token.user);
  }
}
