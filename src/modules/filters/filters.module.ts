import { Broker } from '@broker/broker';
import { Module } from '@nestjs/common';
import { FilterController } from './controllers/filters.controller';
import { BuildingFacilityRepository } from '@adapters/repositories/buildingFacility.repository';
import { ApartmentTypeRepository } from '@adapters/repositories/apartmentType.repository';
import { BuildingCondition } from '@modules/core/entities/buildingCondition.entity';
import { BuildingFurnishRepository } from '@adapters/repositories/buildingFurnish.repository';
import { BuildingTypeRepository } from '@adapters/repositories/buildingType.repository';
import { PropertyTypeRepository } from '@adapters/repositories/propertyType.repository';
import { PurposeRepository } from '@adapters/repositories/purpose.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentType } from '@modules/core/entities/apartmentType.entity';
import { BuildingFurnish } from '@modules/core/entities/buildingFurnish.entity';
import { BuildingType } from '@modules/core/entities/buildingType.entity';
import { PropertyType } from '@modules/core/entities/propertyType.entity';
import { Purpose } from '@modules/core/entities/purpose.entity';
import { BuildingFacility } from '@modules/core/entities/buildingFacility.entity';
import { FiltersService } from './services/filters.service';
import { BuildingConditionRepository } from '@adapters/repositories/buildingCondition.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApartmentType,
      BuildingCondition,
      BuildingFurnish,
      BuildingType,
      PropertyType,
      Purpose,
      BuildingFacility,
    ]),
  ],
  providers: [
    Broker,
    ApartmentTypeRepository,
    BuildingFurnishRepository,
    BuildingTypeRepository,
    PropertyTypeRepository,
    PurposeRepository,
    BuildingFacilityRepository,
    BuildingConditionRepository,
    FiltersService,
  ],
  controllers: [FilterController],
  exports: [
    BuildingFacilityRepository,
    ApartmentTypeRepository,
    BuildingFurnishRepository,
    BuildingTypeRepository,
    PropertyTypeRepository,
    PurposeRepository,
    FiltersService,
    BuildingConditionRepository,
  ],
})
export class FilterModule {}
