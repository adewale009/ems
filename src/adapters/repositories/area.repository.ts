import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from '@modules/core/entities/area.entity';

@Injectable()
export class AreaRepository extends Repository<Area> {
  private logger = new Logger(AreaRepository.name);

  constructor(
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
    private entityManager: EntityManager,
  ) {
    super(areaRepository.target, areaRepository.manager, areaRepository.queryRunner);
  }

  async getAreaById(id: string): Promise<Area | undefined> {
    return await this.findOne({ where: { id: id } });
  }

  async findAreaAndFailIfNotExist(id: string): Promise<Area> {
    const data = await this.findOne({ where: { id } });
    if (!data) {
      this.logger.error(`Area type not found`);
      throw new BadRequestException(`Area type not found`);
    }
    return data;
  }
}
