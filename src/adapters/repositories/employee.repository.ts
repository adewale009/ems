import { EntityManager, Repository } from 'typeorm';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '@modules/core/entities/employee.entity';
import { Role } from '@modules/core/entities/role.entity';
import { Department } from '@modules/core/entities/department.entity';

@Injectable()
export class EmployeeRepository extends Repository<Employee> {
  private logger = new Logger(EmployeeRepository.name);

  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private entityManager: EntityManager,
  ) {
    super(employeeRepository.target, employeeRepository.manager, employeeRepository.queryRunner);
  }

  async createEmployee(data: Partial<Employee>): Promise<Employee> {
    const employee = this.create(data);
    return await this.save(employee);
  }

  async findEmployeeAndFailIfNotExist(id: string): Promise<Employee> {
    const employee = await this.findOne({ where: { id } });
    if (!employee) {
      this.logger.error(`Employee with ID ${id} not found.`);
      throw new BadRequestException(`Employee not found.`);
    }
    return employee;
  }

  async getAllEmployees(): Promise<Employee[]> {
    this.logger.log('Fetching all employees');
    return await this.find();
  }

  async updateEmployee(id: string, updateData: Partial<Employee>): Promise<Employee> {
    await this.update(id, updateData);
    return this.findEmployeeAndFailIfNotExist(id);
  }

  async deleteEmployeeById(id: string): Promise<void> {
    const employee = await this.findEmployeeAndFailIfNotExist(id);
    await this.remove(employee);
    this.logger.log(`Employee with ID ${id} deleted successfully.`);
  }

  async assignRole(employee: Employee, role: Role): Promise<Employee> {
    employee.role = role;
    return this.save(employee);
  }

  async assignToDepartment(employeeId: string, departmentId: string): Promise<Employee> {
    // Validate department existence
    const department = await this.entityManager.findOne(Department, {
      where: { id: departmentId },
    });
    if (!department) {
      throw new BadRequestException(`Department with ID ${departmentId} not found.`);
    }

    // Validate employee existence
    const employee = await this.findOne({ where: { id: employeeId } });
    if (!employee) {
      throw new BadRequestException(`Employee with ID ${employeeId} not found.`);
    }

    // Assign department
    // employee.department = department;

    // Persist updated employee
    return await this.save(employee);
  }
}
