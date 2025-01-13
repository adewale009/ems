import { Module } from '@nestjs/common';
import { Broker } from '@broker/broker';
import { CoreModule } from '@modules/core/core.module';
import { RandomnessUtil } from '@shared/utils/encryption/randomness.util';
import { UserService } from '@modules/core/services/user.service';
import { OtpService } from '@modules/core/services/otp.service';
import { HashingUtil } from '@shared/utils/hashing/hashing.utils';
import { BcryptHashingUtil } from '@shared/utils/hashing/bcrypt.utils';
import { EmailAdapter } from '@adapters/notifications/email/email.adapter';
import { SendgridProvider } from '@adapters/notifications/email/providers/sendgrid.provider';
import { AuthController } from './controllers/auth.controller';
import { LoginUsecase } from './usecases/login.usecase';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenGeneratorUtil } from '@shared/utils/encryption/token.util';
import { SessionRepository } from '@adapters/repositories/session.repository';
import { Session } from '@modules/core/entities/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './services/jwt.strategy';
import { GenerateAccessTokenUsecase } from './usecases/generateAccessToken.usecase';

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([Session]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get<string>('common.auth.jwt.secret'),
        signOptions: {
          expiresIn: configService.get<number>('common.auth.jwt.expiry'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    Broker,
    JwtStrategy,
    UserService,
    OtpService,
    RandomnessUtil,
    EmailAdapter,
    SendgridProvider,
    {
      provide: HashingUtil,
      useClass: BcryptHashingUtil,
    },
    BcryptHashingUtil,
    LoginUsecase,
    AuthService,
    TokenService,
    TokenGeneratorUtil,
    SessionRepository,
    GenerateAccessTokenUsecase,
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
