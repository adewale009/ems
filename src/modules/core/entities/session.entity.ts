import { BaseEntity } from '@shared/repositories/base.entity';
import { Column, Entity, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('sessions')
export class Session extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  userId: string;

  @Column({ type: 'varchar', nullable: false })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'varchar', nullable: false })
  expiresAt: Date;

  @Column({ type: 'varchar', default: false })
  isRevoked: string;

  // @ManyToOne(() => User)
  // user: User;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  user: User;
}
