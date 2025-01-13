import { BaseEntity } from '@shared/repositories/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('departments')
export class Department extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
