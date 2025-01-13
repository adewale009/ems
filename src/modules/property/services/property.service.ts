import { Injectable, Logger } from '@nestjs/common';
import { PropertyRepository } from '@adapters/repositories/property.repository';
import { Property } from '@modules/core/entities/property.entity';
import { FiltersService } from '@modules/filters/services/filters.service';

interface ListingFeatures {
  apartmentTypeId: string;
  buildingConditionId: string;
  purposeId: string;
  propertyTypeId: string;
  buildingFacilities: string[];
  buildingFurnishId: string;
  buildingTypeId: string;
}

@Injectable()
export class PropertyService {
  private logger = new Logger(PropertyService.name);

  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly filterService: FiltersService,
  ) {}

  async createProperty(propertyData: Partial<Property>): Promise<Property> {
    return await this.propertyRepository.createProperty(propertyData);
  }

  async validatePropertyFeatures(features: ListingFeatures): Promise<any> {
    return await Promise.all([
      this.filterService.findApartmentTypeAndFailIfNotExist(features.apartmentTypeId),
      this.filterService.findBuildingConditionAndFailIfNotExist(features.buildingConditionId),
      this.filterService.findBuildingFurnishAndFailIfNotExist(features.buildingFurnishId),
      this.filterService.findBuildingTypeAndFailIfNotExist(features.buildingTypeId),
      this.filterService.findPropertyTypeAndFailIfNotExist(features.propertyTypeId),
      this.filterService.findPurposeAndFailIfNotExist(features.purposeId),
      this.filterService.findBuildingFacilitiesAndFailIfNotExist(features.buildingFacilities),
    ]);
  }
}
