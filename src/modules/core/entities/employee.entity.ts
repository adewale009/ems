import { BaseEntity } from '@shared/repositories/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Department } from './department.entity';
import { Role } from './role.entity';

@Entity('employees')
export class Employee extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;

  @ManyToOne(() => Role, (role) => role.employee, { nullable: true })
  role: Role;

  @ManyToOne(() => Department, (department) => department.employees, { nullable: true })
  department: Department;

  @Column({ default: true })
  status: boolean;
}
