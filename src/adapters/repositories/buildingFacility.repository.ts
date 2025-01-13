import { EntityManager, In, Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingFacility } from '@modules/core/entities/buildingFacility.entity';

@Injectable()
export class BuildingFacilityRepository extends Repository<BuildingFacility> {
  private logger = new Logger(BuildingFacilityRepository.name);

  constructor(
    @InjectRepository(BuildingFacility)
    private buildingFacilityRepository: Repository<BuildingFacility>,
    private entityManager: EntityManager,
  ) {
    super(
      buildingFacilityRepository.target,
      buildingFacilityRepository.manager,
      buildingFacilityRepository.queryRunner,
    );
  }

  async getBuildingFacilityById(id: string): Promise<BuildingFacility | undefined> {
    return await this.findOne({ where: { id: id } });
  }

  async findBuildingFacilityAndFailIfNotExist(id: string): Promise<BuildingFacility> {
    const data = await this.findOne({ where: { id } });
    if (!data) {
      this.logger.error(`Building facility type not found`);
      throw new BadRequestException(`Building facility type not found`);
    }
    return data;
  }

  async findBuildingFacilitiesAndFailIfNotExist(ids: string[]): Promise<BuildingFacility[]> {
    const data = await this.find({ where: { id: In(ids) } });
    if (!data) {
      this.logger.error(`Building facility type not found`);
      throw new BadRequestException(`Building facility type not found`);
    }
    return data;
  }
}
