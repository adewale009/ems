import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalGovernment } from '@modules/core/entities/localGovernment.entity';

@Injectable()
export class LocalGovernmentRepository extends Repository<LocalGovernment> {
  private logger = new Logger(LocalGovernmentRepository.name);

  constructor(
    @InjectRepository(LocalGovernment)
    private localGovernmentRepository: Repository<LocalGovernment>,
    private entityManager: EntityManager,
  ) {
    super(
      localGovernmentRepository.target,
      localGovernmentRepository.manager,
      localGovernmentRepository.queryRunner,
    );
  }

  async getLocalGovernmentById(id: string): Promise<LocalGovernment | undefined> {
    return await this.findOne({ where: { id: id } });
  }

  async findLocalGovernmentAndFailIfNotExist(id: string): Promise<LocalGovernment> {
    const data = await this.findOne({ where: { id } });
    if (!data) {
      this.logger.error(`Local government not found`);
      throw new BadRequestException(`Local government not found`);
    }
    return data;
  }
}
