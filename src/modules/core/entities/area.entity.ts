import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@shared/repositories/base.entity';
import { LocalGovernment } from './localGovernment.entity';
import { Property } from './property.entity';

@Entity('area')
export class Area extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  alias: string;

  @Column({ type: 'uuid' })
  lgaId: string;

  @ManyToOne(() => LocalGovernment, (localGovernment) => localGovernment.id)
  @JoinColumn({ name: 'lga_id' })
  localGovernments: LocalGovernment;

  @OneToMany(() => Property, (property) => property.area)
  properties: Property[];
}
