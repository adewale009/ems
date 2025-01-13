import { EntityManager, FindOneOptions, Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '@modules/core/entities/property.entity';

@Injectable()
export class PropertyRepository extends Repository<Property> {
  private logger = new Logger(PropertyRepository.name);

  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    private entityManager: EntityManager,
  ) {
    super(propertyRepository.target, propertyRepository.manager, propertyRepository.queryRunner);
  }

  async createProperty(propertyData: Partial<Property>): Promise<Property> {
    const property = this.create(propertyData);
    return await this.save(property);
  }

  async getPropertyById(id: FindOneOptions<Property>): Promise<Property | undefined> {
    return await this.findOne({ where: { id: id as string } });
  }

  async updateProperty(
    id: FindOneOptions<Property>,
    updateData: Partial<Property>,
  ): Promise<Property | undefined> {
    await this.update(id as string, updateData);
    return this.getPropertyById(id);
  }

  async getAllProperty(): Promise<Property[]> {
    return await this.find();
  }
}
