import { BaseEntity } from '@shared/repositories/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Employee } from './employee.entity';

@Entity('departments')
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
