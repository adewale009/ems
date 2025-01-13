import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingType } from '@modules/core/entities/buildingType.entity';

@Injectable()
export class BuildingTypeRepository extends Repository<BuildingType> {
  private logger = new Logger(BuildingTypeRepository.name);

  constructor(
    @InjectRepository(BuildingType)
    private buildingTypeRepository: Repository<BuildingType>,
    private entityManager: EntityManager,
  ) {
    super(
      buildingTypeRepository.target,
      buildingTypeRepository.manager,
      buildingTypeRepository.queryRunner,
    );
  }

  async getBuildingTypeById(id: string): Promise<BuildingType | undefined> {
    return await this.findOne({ where: { id: id } });
  }

  async findBuildingTypeAndFailIfNotExist(id: string): Promise<BuildingType> {
    const data = await this.findOne({ where: { id: id } });
    if (!data) {
      this.logger.error(`Building type type not found`);
      throw new BadRequestException(`Building type type not found`);
    }
    return data;
  }
}
