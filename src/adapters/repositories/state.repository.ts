import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from '@modules/core/entities/state.entity';

@Injectable()
export class StateRepository extends Repository<State> {
  private logger = new Logger(StateRepository.name);

  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
    private entityManager: EntityManager,
  ) {
    super(stateRepository.target, stateRepository.manager, stateRepository.queryRunner);
  }

  async getStateById(id: string): Promise<State | undefined> {
    return await this.findOne({ where: { id: id } });
  }

  async findStateAndFailIfNotExist(id: string): Promise<State> {
    const data = await this.findOne({ where: { id } });
    if (!data) {
      this.logger.error(`State type not found`);
      throw new BadRequestException(`State type not found`);
    }
    return data;
  }

  async getStateWithLgaIdAndAreaById(
    stateId: string,
    localGovernmentId: string,
    areaId: string,
  ): Promise<State> {
    return await this.createQueryBuilder('state')
      .leftJoinAndSelect('state.localGovernments', 'localGovernment')
      .leftJoinAndSelect('localGovernment.areas', 'area')
      .where('state.id = :stateId', { stateId })
      .andWhere('localGovernment.id = :localGovernmentId', { localGovernmentId })
      .andWhere('area.id = :areaId', { areaId })
      .getOne();
  }
}
