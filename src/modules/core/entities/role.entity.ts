import { BaseEntity } from '@shared/repositories/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Employee } from '@modules/core/entities/employee.entity';

export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
}

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  alias: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Employee, (employee) => employee.role, { nullable: true })
  employee: Employee;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
