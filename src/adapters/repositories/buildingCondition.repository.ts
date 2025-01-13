import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingCondition } from '@modules/core/entities/buildingCondition.entity';

@Injectable()
export class BuildingConditionRepository extends Repository<BuildingCondition> {
  private logger = new Logger(BuildingConditionRepository.name);

  constructor(
    @InjectRepository(BuildingCondition)
    private buildingConditionRepository: Repository<BuildingCondition>,
    private entityManager: EntityManager,
  ) {
    super(
      buildingConditionRepository.target,
      buildingConditionRepository.manager,
      buildingConditionRepository.queryRunner,
    );
  }

  async getBuildingConditionById(id: string): Promise<BuildingCondition | undefined> {
    return await this.findOne({ where: { id: id } });
  }

  async findBuildingConditionAndFailIfNotExist(id: string): Promise<BuildingCondition> {
    const data = await this.findOne({ where: { id } });
    if (!data) {
      this.logger.error(`Building condition type not found`);
      throw new BadRequestException(`Building condition type not found`);
    }
    return data;
  }
}
