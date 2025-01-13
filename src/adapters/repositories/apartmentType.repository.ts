import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ApartmentType } from '@modules/core/entities/apartmentType.entity';

@Injectable()
export class ApartmentTypeRepository extends Repository<ApartmentType> {
  private logger = new Logger(ApartmentTypeRepository.name);

  constructor(
    @InjectRepository(ApartmentType)
    private apartmentTypeRepository: Repository<ApartmentType>,
    private entityManager: EntityManager,
  ) {
    super(
      apartmentTypeRepository.target,
      apartmentTypeRepository.manager,
      apartmentTypeRepository.queryRunner,
    );
  }

  async getApartmentTypeById(id: string): Promise<ApartmentType | undefined> {
    return await this.findOne({ where: { id: id } });
  }

  async findApartmentTypeAndFailIfNotExist(id: string): Promise<ApartmentType> {
    const data = await this.findOne({ where: { id } });
    if (!data) {
      this.logger.error(`Apartment type type not found`);
      throw new BadRequestException(`Apartment type type not found`);
    }
    return data;
  }
}
