import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@shared/repositories/base.entity';
import { State } from './state.entity';
import { Area } from './area.entity';
import { Property } from './property.entity';

@Entity('local_government')
export class LocalGovernment extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  alias: string;

  @Column({ type: 'uuid' })
  stateId: string;

  @ManyToOne(() => State, (state) => state.id)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @OneToMany(() => Area, (area) => area.localGovernments)
  areas: Area[];

  @OneToMany(() => Property, (property) => property.lga)
  properties: Property[];
}
