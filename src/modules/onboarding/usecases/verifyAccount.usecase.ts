import { Usecase } from '@broker/types';
import { VerifyAccountDto } from '../dtos/verifyAccount.dto';
import { OtpService } from '@modules/core/services/otp.service';
import { UserService } from '@modules/core/services/user.service';
import { Injectable, Logger } from '@nestjs/common';

export type VerifyAccountResponse = {
  message: string;
  destination;
};

@Injectable()
export class VerifyAccountUsecase extends Usecase<VerifyAccountResponse> {
  private readonly logger = new Logger(VerifyAccountUsecase.name);

  constructor(
    private readonly otpService: OtpService,
    private readonly userService: UserService,
  ) {
    super();
  }

  async execute(
    transactionalEntityManager,
    verifyAccountDto: VerifyAccountDto,
  ): Promise<VerifyAccountResponse> {
    // verify the otp
    await this.otpService.confirmAccountVerificationOtpCode({
      medium: verifyAccountDto.email,
      pinId: verifyAccountDto.otp,
    });
    // update the user as verified
    await this.userService.updateUserByEmail({
      email: verifyAccountDto.email,
      hasVerifiedEmail: true,
    });

    return { message: 'Account verified successfully', destination: 'signin' };
  }
}
