import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@shared/repositories/base.entity';
import { Property } from './property.entity';

@Entity('building_condition')
export class BuildingCondition extends BaseEntity {
  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', unique: true })
  alias: string;

  @OneToMany(() => Property, (property) => property.buildingCondition)
  properties: Property[];
}
