import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { DepartmentRepository } from '@adapters/repositories/department.repository';
import { Department } from '@modules/core/entities/department.entity';
import { UpdateDepartmentDto } from '../dtos/updateDepartment.dto';

@Injectable()
export class DepartmentService {
  private logger = new Logger(DepartmentService.name);

  constructor(
    @Inject(forwardRef(() => DepartmentRepository))
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async createDepartment(createDepartmentDto: Partial<Department>): Promise<Department> {
    this.logger.log(`Creating department with data: ${JSON.stringify(createDepartmentDto)}`);
    return this.departmentRepository.createDepartment(createDepartmentDto);
  }

  async findAllDepartments(): Promise<Department[]> {
    this.logger.log('Fetching all departments');
    return this.departmentRepository.getAllDepartments();
  }

  async findDepartmentById(id: string): Promise<Department> {
    this.logger.log(`Fetching department with ID: ${id}`);
    return this.departmentRepository.findDepartmentAndFailIfNotExist({ where: { id } });
  }

  async updateDepartment(id: string, updateData: UpdateDepartmentDto): Promise<Department> {
    this.logger.log(`Updating department with ID: ${id}`);
    return this.departmentRepository.updateDepartment({ where: { id } }, updateData);
  }

  async deleteDepartment(id: string): Promise<void> {
    this.logger.log(`Deleting department with ID: ${id}`);
    await this.departmentRepository.deleteDepartmentById(id);
  }
}
