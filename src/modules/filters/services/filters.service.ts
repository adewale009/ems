// import { BadRequestException, Injectable, Logger } from '@nestjs/common';
// import { ApartmentTypeRepository } from '@adapters/repositories/apartmentType.repository';
// import { BuildingFacilityRepository } from '@adapters/repositories/buildingFacility.repository';
// import { BuildingConditionRepository } from '@adapters/repositories/buildingCondition.repository';
// import { BuildingFurnishRepository } from '@adapters/repositories/buildingFurnish.repository';
// import { BuildingTypeRepository } from '@adapters/repositories/buildingType.repository';
// import { PropertyTypeRepository } from '@adapters/repositories/propertyType.repository';
// import { PurposeRepository } from '@adapters/repositories/purpose.repository';

// @Injectable()
// export class FiltersService {
//   private logger = new Logger(FiltersService.name);

//   constructor(
//     private readonly apartmentTypeRepository: ApartmentTypeRepository,
//     private readonly buildingFacilityRepository: BuildingFacilityRepository,
//     private readonly buildingConditionRepository: BuildingConditionRepository,
//     private readonly buildingFurnishRepository: BuildingFurnishRepository,
//     private readonly buildingTypeRepository: BuildingTypeRepository,
//     private readonly propertyTypeRepository: PropertyTypeRepository,
//     private readonly purposeRepository: PurposeRepository,
//   ) {}

//   async findApartmentTypeAndFailIfNotExist(id: string): Promise<ApartmentType> {
//     return await this.apartmentTypeRepository.findApartmentTypeAndFailIfNotExist(id);
//   }

//   async findBuildingConditionAndFailIfNotExist(id: string): Promise<BuildingCondition> {
//     return await this.buildingConditionRepository.findBuildingConditionAndFailIfNotExist(id);
//   }

//   async findBuildingFacilityAndFailIfNotExist(id: string): Promise<BuildingFacility> {
//     return await this.buildingFacilityRepository.findBuildingFacilityAndFailIfNotExist(id);
//   }

//   async findBuildingFacilitiesAndFailIfNotExist(ids: string[]): Promise<BuildingFacility[]> {
//     const data = await this.buildingFacilityRepository.findBuildingFacilitiesAndFailIfNotExist(ids);

//     if (data.length === ids.length) {
//       return data;
//     } else {
//       throw new BadRequestException('Some facility IDs do not exist in the database');
//     }
//   }

//   async findBuildingFurnishAndFailIfNotExist(id: string): Promise<BuildingFurnish> {
//     return await this.buildingFurnishRepository.findBuildingFurnishAndFailIfNotExist(id);
//   }

//   async findBuildingTypeAndFailIfNotExist(id: string): Promise<BuildingType> {
//     return await this.buildingTypeRepository.findBuildingTypeAndFailIfNotExist(id);
//   }

//   async findPropertyTypeAndFailIfNotExist(id: string): Promise<PropertyType> {
//     return await this.propertyTypeRepository.findPropertyTypeAndFailIfNotExist(id);
//   }

//   async findPurposeAndFailIfNotExist(id: string): Promise<Purpose> {
//     return await this.purposeRepository.findPurposeAndFailIfNotExist(id);
//   }
// }
