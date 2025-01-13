import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@shared/repositories/base.entity';
import { Property } from './property.entity';

@Entity('apartment_type')
export class ApartmentType extends BaseEntity {
  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar', unique: true })
  alias: string;

  @OneToMany(() => Property, (property) => property.apartmentType)
  properties: Property[];
}
