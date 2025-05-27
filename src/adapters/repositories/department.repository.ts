import { EntityManager, Repository, FindOneOptions } from 'typeorm';
import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from '@modules/core/entities/department.entity';
import { Employee } from '@modules/core/entities/employee.entity';
import { UpdateDepartmentDto } from '@modules/department/dtos/updateDepartment.dto';
import { FetchAllDepartmentsDto } from '@modules/department/dtos/FetchAllDepartmentsDto';

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
  async findDepartmentAndFailIfNotExist(
    entityManager: EntityManager,
    id: string,
  ): Promise<Department> {
    const department = await entityManager.findOne(Department, { where: { id } });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  /**
   * Updates a department and saves it to the database.
   */
  async updateDepartment(
    entityManager: EntityManager,
    input: UpdateDepartmentDto,
  ): Promise<Department> {
    if (!input.id) {
      throw new BadRequestException('Department ID is required for update.');
    }

    // Find department using entityManager
    const existingDepartment = await entityManager.findOne(Department, {
      where: { id: input.id },
    });

    if (!existingDepartment) {
      throw new NotFoundException(`Department with ID ${input.id} not found.`);
    }

    // Update only provided fields
    if (input.name !== undefined) {
      existingDepartment.name = input.name;
    }

    if (input.description !== undefined) {
      existingDepartment.description = input.description;
    }

    this.logger.debug(`Updating Department: ${JSON.stringify(existingDepartment, null, 2)}`);

    // Save using entityManager
    return await entityManager.save(existingDepartment);
  }

  /**
   * Deletes a department by its ID.
   */
  async deleteDepartmentById(entityManager: EntityManager, departmentId: string): Promise<void> {
    const department = await this.findDepartmentAndFailIfNotExist(entityManager, departmentId);
    await entityManager.remove(department);
    this.logger.log(`Department with ID ${departmentId} deleted successfully.`);
  }

  /**
   * Retrieves all departments from the database.
   */
  // async getAllDepartments(): Promise<Department[]> {
  //   this.logger.log('Fetching all departments.');
  //   return await this.find();
  // }

  async getAllDepartments(filters: FetchAllDepartmentsDto): Promise<Department[]> {
    const { name, page = 1, limit = 10 } = filters;

    const query = this.departmentRepository.createQueryBuilder('department');

    if (name) {
      query.andWhere('department.name ILIKE :name', { name: `%${name}%` });
    }

    query.skip((page - 1) * limit).take(limit);

    return query.getMany();
  }

  /**
   * Retrieves a department from the database.
   */
  async findDepartmentById(entityManager: EntityManager, id: string): Promise<Department | null> {
    return entityManager.findOne(Department, { where: { id } });
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
