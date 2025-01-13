import { Injectable, Logger } from '@nestjs/common';
import { DepartmentService } from '../services/department.service';
import { Department } from '../../core/entities/department.entity';
import { Usecase } from '@broker/types';

@Injectable()
export class FetchDepartmentUsecase extends Usecase {
  private readonly logger = new Logger(FetchDepartmentUsecase.name);

  constructor(private readonly departmentService: DepartmentService) {
    super();
  }

  async execute(id?: string): Promise<Department | Department[]> {
    if (id) {
      this.logger.log(`Fetching department with ID: ${id}`);
      return this.departmentService.findDepartmentById(id);
    }
    this.logger.log('Fetching all departments');
    return this.departmentService.findAllDepartments();
  }
}
