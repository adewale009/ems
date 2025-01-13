import { BaseEntity } from '@shared/repositories/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Role } from './role.entity';

import { Property } from './property.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: false })
  firstname: string;

  @Column({ type: 'varchar', nullable: false })
  lastname: string;

  @Column({ type: 'uuid', nullable: false })
  roleId: string;

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'boolean', default: false })
  hasVerifiedEmail: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;

  @ManyToOne(() => Role, (RoleEntity) => RoleEntity.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;
  sessions: any;
}
