import { Usecase } from '@broker/types';
import { OtpService } from '@modules/core/services/otp.service';
import { UserService } from '@modules/core/services/user.service';
import { Injectable, Logger } from '@nestjs/common';
import { SignupDto } from '../dtos/signUp.dto';

export type SignupResponse = {
  email: string;
  destination: string;
};

@Injectable()
export class SignupUsecase extends Usecase<SignupResponse> {
  private logger = new Logger(SignupUsecase.name);

  constructor(
    private readonly userService: UserService,
    private readonly otpService: OtpService,
  ) {
    super();
  }

  async execute(transactionalEntityManager, signUpDto: SignupDto): Promise<SignupResponse> {
    const user = await this.userService.createUser(signUpDto);
    await this.otpService.createAccountVerificationOtpCode({
      medium: user.email,
      userId: user.id,
      firstname: user.firstname,
    });
    return { email: user.email, destination: 'verify email' };
  }
}
