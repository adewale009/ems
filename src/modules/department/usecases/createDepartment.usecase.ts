import { DepartmentService } from '../services/department.service';
import { CreateDepartmentDto } from '../dtos/createDepartment.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Usecase } from '@broker/types';
import { Department } from '@modules/core/entities/department.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class CreateDepartmentUsecase extends Usecase {
  private readonly logger = new Logger(CreateDepartmentUsecase.name);

  constructor(private readonly departmentService: DepartmentService) {
    super();
  }

  async execute(
    entityManager: EntityManager,
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Partial<Department>> {
    this.logger.log(`Executing CreateDepartmentUsecase with name: ${createDepartmentDto.name}`);

    const savedDepartment = await this.departmentService.createDepartment(createDepartmentDto);

    return {
      id: savedDepartment.id,
      name: savedDepartment.name,
      createdAt: savedDepartment.createdAt,
    };
  }
}
