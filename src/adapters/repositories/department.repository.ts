import { EntityManager, Repository, FindOneOptions } from 'typeorm';
import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '@modules/core/entities/department.entity';
import { Employee } from '@modules/core/entities/employee.entity';

@Injectable()
export class DepartmentRepository extends Repository<Department> {
  private logger = new Logger(DepartmentRepository.name);

  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    private readonly entityManager: EntityManager,
  ) {
    super(
      departmentRepository.target,
      departmentRepository.manager,
      departmentRepository.queryRunner,
    );
  }

  /**
   * Creates a new department and saves it to the database.
   */
  async createDepartment(departmentData: Partial<Department>): Promise<Department> {
    const department = this.create(departmentData);
    this.logger.log(`Creating department: ${JSON.stringify(departmentData)}`);
    return await this.save(department);
  }

  /**
   * Checks if a department already exists by the given criteria.
   * Throws an exception if it exists.
   */
  async findDepartmentAndFailIfExist(options: FindOneOptions<Department>): Promise<void> {
    const department = await this.findOne(options);
    if (department) {
      this.logger.error(`This department already exists.`);
      throw new BadRequestException(`This department already exists.`);
    }
  }

  /**
   * Finds a department by criteria and throws an exception if it does not exist.
   */
  async findDepartmentAndFailIfNotExist(options: FindOneOptions<Department>): Promise<Department> {
    const department = await this.findOne(options);
    if (!department) {
      this.logger.error(`Department not found.`);
      throw new NotFoundException(`Department not found.`);
    }
    return department;
  }

  /**
   * Updates a department's details.
   */
  async updateDepartment(
    options: FindOneOptions<Department>,
    updateData: Partial<Department>,
  ): Promise<Department> {
    const department = await this.findDepartmentAndFailIfNotExist(options);
    Object.assign(department, updateData);
    this.logger.log(`Updating department: ${JSON.stringify(updateData)}`);
    return await this.save(department);
  }

  /**
   * Deletes a department by its ID.
   */
  async deleteDepartmentById(departmentId: string): Promise<void> {
    const department = await this.findDepartmentAndFailIfNotExist({ where: { id: departmentId } });
    await this.remove(department);
    this.logger.log(`Department with ID ${departmentId} deleted successfully.`);
  }

  /**
   * Retrieves all departments from the database.
   */
  async getAllDepartments(): Promise<Department[]> {
    this.logger.log('Fetching all departments.');
    return await this.find();
  }

  async addEmployee(departmentId: string, employeeId: string): Promise<Department> {
    // Validate employee existence
    const employee = await this.entityManager.findOne(Employee, { where: { id: employeeId } });
    if (!employee) {
      throw new BadRequestException(`Employee with ID ${employeeId} not found.`);
    }

    // Validate department existence
    const department = await this.findOne({ where: { id: departmentId } });
    if (!department) {
      throw new BadRequestException(`Department with ID ${departmentId} not found.`);
    }

    // Add employee to department
    if (!department.employees) {
      department.employees = [];
    }
    department.employees.push(employee);

    // Persist updated department
    return await this.save(department);
  }
}
