import { EntityManager, Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyType } from '@modules/core/entities/propertyType.entity';

@Injectable()
export class PropertyTypeRepository extends Repository<PropertyType> {
  private logger = new Logger(PropertyTypeRepository.name);

  constructor(
    @InjectRepository(PropertyType)
    private propertyTypeRepository: Repository<PropertyType>,
    private entityManager: EntityManager,
  ) {
    super(
      propertyTypeRepository.target,
      propertyTypeRepository.manager,
      propertyTypeRepository.queryRunner,
    );
  }

  async createPropertyType(propertytypeData: Partial<PropertyType>): Promise<PropertyType> {
    const data = this.create(propertytypeData);
    return await this.save(data);
  }

  async getPropertyTypeById(id: string): Promise<PropertyType | undefined> {
    return await this.findOne({ where: { id: id as string } });
  }

  async findPropertyTypeAndFailIfNotExist(id: string): Promise<PropertyType> {
    const propertyType = await this.findOne({ where: { id: id } });
    if (!propertyType) {
      this.logger.error(`Property type not found`);
      throw new BadRequestException(`Property type not found`);
    }
    return propertyType;
  }
}
