import { Usecase } from '@broker/types';
import { Injectable, Logger } from '@nestjs/common';
import { ListPropertyDto } from '../dtos/listProperty.dto';
import { PropertyService } from '../services/property.service';
import { ListngStatus } from '@modules/core/entities/property.entity';
import { LocationService } from '@modules/location/services/location.service';
import { User } from '@modules/core/entities/user.entity';

type ListPropertyResponse = {
  data: ListPropertyDto;
};

@Injectable()
export class ListPropertyUsecase extends Usecase<ListPropertyResponse> {
  private logger = new Logger(ListPropertyUsecase.name);

  constructor(
    private readonly propertyService: PropertyService,
    private readonly locationService: LocationService,
  ) {
    super();
  }

  async execute(
    transactionalEntityManager,
    { listingDto, user }: { listingDto: ListPropertyDto; user: User },
  ): Promise<ListPropertyResponse> {
    this.logger.log('Executing SigninUsecase');

    await this.propertyService.validatePropertyFeatures({
      apartmentTypeId: listingDto.apartmentTypeId,
      buildingConditionId: listingDto.buildingConditionId,
      purposeId: listingDto.purposeId,
      propertyTypeId: listingDto.propertyTypeId,
      buildingFacilities: listingDto.facilities,
      buildingFurnishId: listingDto.buildingFurnishId,
      buildingTypeId: listingDto.buildingTypeId,
    });

    await this.locationService.validateLocation(
      listingDto.stateId,
      listingDto.lgaId,
      listingDto.areaId,
    );

    await this.propertyService.createProperty({
      userId: user.id,
      ...listingDto,
      status: listingDto.status === ListngStatus.DRAFT ? ListngStatus.DRAFT : ListngStatus.PENDING,
    });

    return { data: listingDto };
  }
}
