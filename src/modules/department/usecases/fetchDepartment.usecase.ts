import { Injectable, Logger } from '@nestjs/common';
import { DepartmentService } from '../services/department.service';
import { Department } from '../../core/entities/department.entity';
import { Usecase } from '@broker/types';
import { EntityManager } from 'typeorm';

@Injectable()
export class FetchDepartmentUsecase extends Usecase {
  private readonly logger = new Logger(FetchDepartmentUsecase.name);

  constructor(private readonly departmentService: DepartmentService) {
    super();
  }

  async execute(
    entityManager: EntityManager,
    data: { id: string },
  ): Promise<Department | Department[]> {
    if (data) {
      this.logger.log(`Fetching department with ID: ${data.id}`);
      return this.departmentService.findDepartmentById(data.id);
    }
    this.logger.log(
      `Fetching department with ID: ${JSON.stringify(data.id)}, typeof: ${typeof data}`,
    );
  }
}
