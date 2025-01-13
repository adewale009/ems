import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@shared/repositories/base.entity';
import { LocalGovernment } from './localGovernment.entity';
import { Property } from './property.entity';

@Entity('state')
export class State extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  alias: string;

  @OneToMany(() => LocalGovernment, (localGovernment) => localGovernment.state)
  localGovernments: LocalGovernment[];

  @OneToMany(() => Property, (property) => property.state)
  properties: Property[];
}
