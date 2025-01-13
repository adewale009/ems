import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purpose } from '@modules/core/entities/purpose.entity';

@Injectable()
export class PurposeRepository extends Repository<Purpose> {
  private logger = new Logger(PurposeRepository.name);

  constructor(
    @InjectRepository(Purpose)
    private purposeRepository: Repository<Purpose>,
    private entityManager: EntityManager,
  ) {
    super(purposeRepository.target, purposeRepository.manager, purposeRepository.queryRunner);
  }

  async getPurposeById(id: string): Promise<Purpose | undefined> {
    return await this.findOne({ where: { id: id } });
  }

  async findPurposeAndFailIfNotExist(id: string): Promise<Purpose> {
    const data = await this.findOne({ where: { id: id } });
    if (!data) {
      this.logger.error(`Purpose type not found`);
      throw new BadRequestException(`Purpose type not found`);
    }
    return data;
  }
}
