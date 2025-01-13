import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@shared/repositories/base.entity';

@Entity('building_facility')
export class BuildingFacility extends BaseEntity {
  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', unique: true })
  alias: string;
}
