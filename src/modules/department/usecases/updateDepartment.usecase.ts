import { DepartmentService } from '../services/department.service';
import { UpdateDepartmentDto } from '../dtos/updateDepartment.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Usecase } from '@broker/types';
import { EntityManager } from 'typeorm';
import { DepartmentResponseDto } from '../dtos/departmentResponse.dto';

@Injectable()
export class UpdateDepartmentUsecase extends Usecase {
  private readonly logger = new Logger(UpdateDepartmentUsecase.name);

  constructor(private readonly departmentService: DepartmentService) {
    super();
  }

  async execute(
    entityManager: EntityManager,
    input: UpdateDepartmentDto,
  ): Promise<{ result: DepartmentResponseDto }> {
    const updatedDepartment = await this.departmentService.updateDepartment(entityManager, input);

    const result = {
      id: updatedDepartment.id,
      name: updatedDepartment.name,
      description: updatedDepartment.description,
      created_at: updatedDepartment.createdAt,
      updated_at: updatedDepartment.updatedAt,
    };

    return { result };
  }
}
