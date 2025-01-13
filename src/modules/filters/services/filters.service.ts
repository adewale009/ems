import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BuildingFacility } from '@modules/core/entities/buildingFacility.entity';
import { ApartmentTypeRepository } from '@adapters/repositories/apartmentType.repository';
import { BuildingFacilityRepository } from '@adapters/repositories/buildingFacility.repository';
import { BuildingConditionRepository } from '@adapters/repositories/buildingCondition.repository';
import { BuildingFurnishRepository } from '@adapters/repositories/buildingFurnish.repository';
import { BuildingCondition } from '@modules/core/entities/buildingCondition.entity';
import { ApartmentType } from '@modules/core/entities/apartmentType.entity';
import { BuildingFurnish } from '@modules/core/entities/buildingFurnish.entity';
import { BuildingTypeRepository } from '@adapters/repositories/buildingType.repository';
import { BuildingType } from '@modules/core/entities/buildingType.entity';
import { PropertyType } from '@modules/core/entities/propertyType.entity';
import { PropertyTypeRepository } from '@adapters/repositories/propertyType.repository';
import { PurposeRepository } from '@adapters/repositories/purpose.repository';
import { Purpose } from '@modules/core/entities/purpose.entity';

@Injectable()
export class FiltersService {
  private logger = new Logger(FiltersService.name);

  constructor(
    private readonly apartmentTypeRepository: ApartmentTypeRepository,
    private readonly buildingFacilityRepository: BuildingFacilityRepository,
    private readonly buildingConditionRepository: BuildingConditionRepository,
    private readonly buildingFurnishRepository: BuildingFurnishRepository,
    private readonly buildingTypeRepository: BuildingTypeRepository,
    private readonly propertyTypeRepository: PropertyTypeRepository,
    private readonly purposeRepository: PurposeRepository,
  ) {}

  async findApartmentTypeAndFailIfNotExist(id: string): Promise<ApartmentType> {
    return await this.apartmentTypeRepository.findApartmentTypeAndFailIfNotExist(id);
  }

  async findBuildingConditionAndFailIfNotExist(id: string): Promise<BuildingCondition> {
    return await this.buildingConditionRepository.findBuildingConditionAndFailIfNotExist(id);
  }

  async findBuildingFacilityAndFailIfNotExist(id: string): Promise<BuildingFacility> {
    return await this.buildingFacilityRepository.findBuildingFacilityAndFailIfNotExist(id);
  }

  async findBuildingFacilitiesAndFailIfNotExist(ids: string[]): Promise<BuildingFacility[]> {
    const data = await this.buildingFacilityRepository.findBuildingFacilitiesAndFailIfNotExist(ids);

    if (data.length === ids.length) {
      return data;
    } else {
      throw new BadRequestException('Some facility IDs do not exist in the database');
    }
  }

  async findBuildingFurnishAndFailIfNotExist(id: string): Promise<BuildingFurnish> {
    return await this.buildingFurnishRepository.findBuildingFurnishAndFailIfNotExist(id);
  }

  async findBuildingTypeAndFailIfNotExist(id: string): Promise<BuildingType> {
    return await this.buildingTypeRepository.findBuildingTypeAndFailIfNotExist(id);
  }

  async findPropertyTypeAndFailIfNotExist(id: string): Promise<PropertyType> {
    return await this.propertyTypeRepository.findPropertyTypeAndFailIfNotExist(id);
  }

  async findPurposeAndFailIfNotExist(id: string): Promise<Purpose> {
    return await this.purposeRepository.findPurposeAndFailIfNotExist(id);
  }
}
