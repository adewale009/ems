import { OtpCodeRepository } from '@adapters/repositories/otp.repository';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RandomnessUtil } from '@shared/utils/encryption/randomness.util';
import { OtpActions, OtpCode } from '../entities/otp.entity';
import { ConfigService } from '@nestjs/config';
import { addMinutes, differenceInMinutes } from 'date-fns';
import { FindOneOptions } from 'typeorm';
import { EmailAdapter } from '@adapters/notifications/email/email.adapter';

interface createAccountVerificationOtpCodeDto extends Pick<OtpCode, 'userId' | 'medium'> {
  firstname: string;
}

@Injectable()
export class OtpService {
  private logger = new Logger(OtpService.name);

  constructor(
    private readonly randomnessUtil: RandomnessUtil,
    private readonly otpRepository: OtpCodeRepository,
    private readonly configService: ConfigService,
    private readonly emailAdapter: EmailAdapter,
  ) {}

  private generateOtpCode(length: number): string {
    return this.randomnessUtil.generateRandomNumberString(length);
  }

  async createAccountVerificationOtpCode(data: createAccountVerificationOtpCodeDto): Promise<void> {
    const otpCode = this.generateOtpCode(6);
    await this.otpRepository.createOtpCode({
      ...data,
      pinId: otpCode,
      action: OtpActions.VERIFY_EMAIL,
      expiresAt: addMinutes(
        new Date(),
        this.configService.get<number>('common.emailVerificationOtpValidityInMinutes'),
      ).toISOString(),
    });

    await this.emailAdapter.send({
      to: data.medium,
      from: {
        name: this.configService.get<string>('common.sendgrid.senderName'),
        email: this.configService.get<string>('common.sendgrid.senderEmail'),
      },
      templateId: this.configService.get<string>('common.sendgrid.templates.emailVerification'),
      dynamicTemplateData: {
        firstname: data.firstname,
        otp: otpCode,
        expiryTime: this.configService.get<number>('common.emailVerificationOtpValidityInMinutes'),
      },
    });
  }

  async confirmAccountVerificationOtpCode(data: Pick<OtpCode, 'medium' | 'pinId'>): Promise<void> {
    const OtpDetails = await this.otpRepository.getOtpCodeByMedium(
      data.medium,
      OtpActions.VERIFY_EMAIL,
    );
    if (!OtpDetails) {
      throw new BadRequestException('Invalid Request');
    }
    if (OtpDetails.pinId !== data.pinId) {
      throw new BadRequestException('Invalid OTP');
    }
    if (
      differenceInMinutes(new Date(), OtpDetails.expiresAt) >
      this.configService.get<number>('common.emailVerificationOtpValidityInMinutes')
    ) {
      throw new BadRequestException('OTP Expired');
    }
    await this.otpRepository.updateOtpCode(OtpDetails.id as FindOneOptions<OtpCode>, {
      isVerified: true,
      isActive: false,
    });
  }
}
