import { Module } from '@nestjs/common';
import { Broker } from '@broker/broker';
import { CoreModule } from '@modules/core/core.module';
import { OnboardingController } from './controllers/onboarding.controller';
import { SignupUsecase } from './usecases/signUp.usecase';
import { RandomnessUtil } from '@shared/utils/encryption/randomness.util';
import { UserService } from '@modules/core/services/user.service';
import { OtpService } from '@modules/core/services/otp.service';
import { HashingUtil } from '@shared/utils/hashing/hashing.utils';
import { BcryptHashingUtil } from '@shared/utils/hashing/bcrypt.utils';
import { EmailAdapter } from '@adapters/notifications/email/email.adapter';
import { SendgridProvider } from '@adapters/notifications/email/providers/sendgrid.provider';
import { VerifyAccountUsecase } from './usecases/verifyAccount.usecase';

@Module({
  imports: [CoreModule],
  providers: [
    Broker,
    UserService,
    OtpService,
    RandomnessUtil,
    SignupUsecase,
    EmailAdapter,
    SendgridProvider,
    VerifyAccountUsecase,
    {
      provide: HashingUtil,
      useClass: BcryptHashingUtil,
    },
    BcryptHashingUtil,
  ],
  controllers: [OnboardingController],
  exports: [],
})
export class OnboardingModule {}
