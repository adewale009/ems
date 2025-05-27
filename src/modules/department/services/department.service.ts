import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { DepartmentRepository } from '@adapters/repositories/department.repository';
import { Department } from '@modules/core/entities/department.entity';
import { UpdateDepartmentDto } from '../dtos/updateDepartment.dto';
import { EntityManager } from 'typeorm';
import { FetchAllDepartmentsDto } from '../dtos/FetchAllDepartmentsDto';

@Injectable()
export class DepartmentService {
  private logger = new Logger(DepartmentService.name);

  constructor(
    @Inject(forwardRef(() => DepartmentRepository))
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async createDepartment(createDepartmentDto: Partial<Department>): Promise<Department> {
    console.log(createDepartmentDto);
    const newDepartment = this.departmentRepository.create(createDepartmentDto);
    return await this.departmentRepository.save(newDepartment);
  }

  async findAllDepartments(filters: FetchAllDepartmentsDto): Promise<Department[]> {
    this.logger.log('Fetching all departments');
    return this.departmentRepository.getAllDepartments(filters);
  }

  async findDepartmentById(id: string): Promise<Department> {
    this.logger.log(`Fetching department with ID: ${id}`);
    return await this.departmentRepository.findOneById(id);
  }

  async updateDepartment(
    entityManager: EntityManager,
    input: UpdateDepartmentDto,
  ): Promise<Department> {
    const department = await this.departmentRepository.findDepartmentAndFailIfNotExist(
      entityManager,
      input.id,
    );

    Object.assign(department, input);

    return await entityManager.save(department);
  }

  async deleteDepartment(entityManager: EntityManager, id: string): Promise<void> {
    this.logger.log(`Deleting department with ID: ${id}`);
    await this.departmentRepository.deleteDepartmentById(entityManager, id);
  }
}
