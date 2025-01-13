import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingFurnish } from '@modules/core/entities/buildingFurnish.entity';

@Injectable()
export class BuildingFurnishRepository extends Repository<BuildingFurnish> {
  private logger = new Logger(BuildingFurnishRepository.name);

  constructor(
    @InjectRepository(BuildingFurnish)
    private buildingFurnishRepository: Repository<BuildingFurnish>,
    private entityManager: EntityManager,
  ) {
    super(
      buildingFurnishRepository.target,
      buildingFurnishRepository.manager,
      buildingFurnishRepository.queryRunner,
    );
  }

  async getBuildingFurnishById(id: string): Promise<BuildingFurnish | undefined> {
    return await this.findOne({ where: { id: id } });
  }

  async findBuildingFurnishAndFailIfNotExist(id: string): Promise<BuildingFurnish> {
    const data = await this.findOne({ where: { id } });
    if (!data) {
      this.logger.error(`Building furnish type not found`);
      throw new BadRequestException(`Building furnish type not found`);
    }
    return data;
  }
}
