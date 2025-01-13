import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@shared/repositories/base.entity';
import { PropertyType } from './propertyType.entity';
import { Purpose } from './purpose.entity';
import { State } from './state.entity';
import { LocalGovernment } from './localGovernment.entity';
import { Area } from './area.entity';
import { BuildingType } from './buildingType.entity';
import { BuildingCondition } from './buildingCondition.entity';
import { BuildingFurnish } from './buildingFurnish.entity';
import { ApartmentType } from './apartmentType.entity';
import { User } from './user.entity';

export enum ListngStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity('property')
export class Property extends BaseEntity {
  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ListngStatus })
  status: ListngStatus;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  lat: string;

  @Column({ type: 'varchar' })
  long: string;

  @Column({ type: 'varchar', array: true })
  imageUrl: string[];

  @Column({ type: 'varchar', nullable: true })
  videoUrl: string;

  @Column({ type: 'int', nullable: true })
  size: number;

  @Column({ type: 'int', nullable: true })
  toilet: number;

  @Column({ type: 'varchar', nullable: true })
  rentType: string;

  @Column({ type: 'int', nullable: true })
  rentFee: number;

  @Column({ type: 'int', nullable: true })
  damageFee: number;

  @Column({ type: 'int', nullable: true })
  agencyFee: number;

  @Column({ type: 'int', nullable: true })
  serviceCharge: number;

  @Column({ type: 'int', nullable: true })
  rentDuration: number;

  @Column({ type: 'varchar', array: true, nullable: true })
  facilities: string[];

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  propertyTypeId: string;

  @Column({ type: 'uuid' })
  purposeId: string;

  @Column({ type: 'uuid' })
  stateId: string;

  @Column({ type: 'uuid' })
  lgaId: string;

  @Column({ type: 'uuid' })
  buildingTypeId: string;

  @Column({ type: 'uuid' })
  areaId: string;

  @Column({ type: 'uuid' })
  buildingConditionId: string;

  @Column({ type: 'uuid' })
  buildingFurnishId: string;

  @Column({ type: 'uuid' })
  apartmentTypeId: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => PropertyType, (propertyType) => propertyType.id)
  @JoinColumn({ name: 'property_type_id' })
  propertyType: PropertyType;

  @ManyToOne(() => Purpose, (purpose) => purpose.id)
  @JoinColumn({ name: 'purpose_id' })
  purpose: Purpose;

  @ManyToOne(() => State, (state) => state.id)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @ManyToOne(() => LocalGovernment, (localGovernment) => localGovernment.id)
  @JoinColumn({ name: 'lga_id' })
  lga: LocalGovernment;

  @ManyToOne(() => BuildingType, (buildingType) => buildingType.id, { nullable: true })
  @JoinColumn({ name: 'building_type_id' })
  buildingType: BuildingType;

  @ManyToOne(() => Area, (area) => area.id)
  @JoinColumn({ name: 'area_id' })
  area: Area;

  @ManyToOne(() => BuildingCondition, (buildingCondition) => buildingCondition.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'building_condition_id' })
  buildingCondition: BuildingCondition;

  @ManyToOne(() => BuildingFurnish, (buildingFurnish) => buildingFurnish.id, { nullable: true })
  @JoinColumn({ name: 'building_furnish_id' })
  buildingFurnish: BuildingFurnish;

  @ManyToOne(() => ApartmentType, (apartmentType) => apartmentType.id, { nullable: true })
  @JoinColumn({ name: 'apartment_type_id' })
  apartmentType: ApartmentType;
}
