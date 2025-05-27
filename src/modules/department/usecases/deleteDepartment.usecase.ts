import { Injectable, Logger } from '@nestjs/common';
import { DepartmentService } from '../services/department.service';
import { Usecase } from '@broker/types';
import { EntityManager } from 'typeorm';

@Injectable()
export class DeleteDepartmentUsecase extends Usecase {
  private readonly logger = new Logger(DeleteDepartmentUsecase.name);

  constructor(private readonly departmentService: DepartmentService) {
    super();
  }

  async execute(entityManager: EntityManager, data: { id: string }) {
    this.logger.log('Executing DeleteDepartmentUsecase');
    return this.departmentService.deleteDepartment(entityManager, data.id);
  }
}
