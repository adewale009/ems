import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@shared/repositories/base.entity';
import { Property } from './property.entity';

@Entity('building_type')
export class BuildingType extends BaseEntity {
  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', unique: true })
  alias: string;

  @OneToMany(() => Property, (property) => property.buildingType)
  properties: Property[];
}
