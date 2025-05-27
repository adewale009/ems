import { Injectable, Logger } from '@nestjs/common';
import { FetchAllDepartmentsDto } from '../dtos/FetchAllDepartmentsDto';
import { Department } from '@modules/core/entities/department.entity';
import { DepartmentService } from '../services/department.service';
import { Usecase } from '@broker/types';

@Injectable()
export class FetchAllDepartmentsUsecase implements Usecase {
  private readonly logger = new Logger(FetchAllDepartmentsDto.name);

  constructor(private readonly departmentService: DepartmentService) {}

  async execute(data: FetchAllDepartmentsDto): Promise<Department[]> {
    return this.departmentService.findAllDepartments(data);
  }
}
