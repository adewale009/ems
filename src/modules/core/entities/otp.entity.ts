import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '@shared/repositories/base.entity';

export enum OtpActions {
  VERIFY_EMAIL = 'verify_email',
}

@Entity('otp_codes')
export class OtpCode extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'varchar', nullable: false })
  pinId: string;

  @Column({ type: 'varchar', nullable: false })
  medium: string;

  @Column({ type: 'enum', enum: OtpActions, nullable: false })
  action: OtpActions;

  @Column({ type: 'timestamp', nullable: false })
  expiresAt: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
