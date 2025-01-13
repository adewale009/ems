import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { EmployeeRepository } from '@adapters/repositories/employee.repository';
import { Employee } from '@modules/core/entities/employee.entity';
import { RoleRepository } from '../../../adapters/repositories/role.repository';
import { DepartmentRepository } from '../../../adapters/repositories/department.repository';

@Injectable()
export class EmployeeService {
  private logger = new Logger(EmployeeService.name);

  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly roleRepository: RoleRepository,
    private readonly departmentRepository: DepartmentRepository,
  ) {}

  async createEmployee(data: Partial<Employee>): Promise<Employee> {
    this.logger.log(`Creating employee with data: ${JSON.stringify(data)}`);
    return this.employeeRepository.createEmployee(data);
  }

  async findAllEmployees(): Promise<Employee[]> {
    this.logger.log('Fetching all employees');
    return this.employeeRepository.getAllEmployees();
  }

  async findEmployeeById(id: string): Promise<Employee> {
    this.logger.log(`Fetching employee with ID: ${id}`);
    return this.employeeRepository.findEmployeeAndFailIfNotExist(id);
  }

  async updateEmployee(id: string, updateData: Partial<Employee>): Promise<Employee> {
    this.logger.log(`Updating employee with ID: ${id}`);
    return this.employeeRepository.updateEmployee(id, updateData);
  }

  async deleteEmployee(id: string): Promise<void> {
    this.logger.log(`Deleting employee with ID: ${id}`);
    await this.employeeRepository.deleteEmployeeById(id);
  }

  async assignRoleToEmployee(employeeId: string, roleId: string): Promise<Employee> {
    // Validate the role
    const role = await this.roleRepository.findRoleAndFailIfNotExist({ where: { id: roleId } });
    if (!role) {
      this.logger.error(`Role with ID ${roleId} does not exist.`);
      throw new BadRequestException(`Role with ID ${roleId} not found.`);
    }

    // Validate the employee
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
    if (!employee) {
      this.logger.error(`Employee with ID ${employeeId} does not exist.`);
      throw new BadRequestException(`Employee with ID ${employeeId} not found.`);
    }

    // Assign the role to the employee
    employee.role = role;

    // Persist the updated employee
    const updatedEmployee = await this.employeeRepository.save(employee);

    this.logger.log(
      `Role with ID ${roleId} successfully assigned to Employee with ID ${employeeId}.`,
    );

    return updatedEmployee;
  }

  /**
   * Assigns an employee to a department
   * @param employeeId - UUID of the employee
   * @param departmentId - UUID of the department
   * @returns Updated Employee entity
   */
  async assignEmployeeToDepartment(employeeId: string, departmentId: string): Promise<Employee> {
    this.logger.log(`Assigning Employee ID ${employeeId} to Department ID ${departmentId}`);

    // Validate department existence
    const department = await this.departmentRepository.findOne({ where: { id: departmentId } });
    if (!department) {
      this.logger.error(`Department with ID ${departmentId} does not exist.`);
      throw new BadRequestException(`Department with ID ${departmentId} not found.`);
    }

    // Validate employee existence
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
    if (!employee) {
      this.logger.error(`Employee with ID ${employeeId} does not exist.`);
      throw new BadRequestException(`Employee with ID ${employeeId} not found.`);
    }

    // Assign department to employee
    employee.department = department;

    // Persist updated employee
    const updatedEmployee = await this.employeeRepository.save(employee);

    this.logger.log(
      `Successfully assigned Employee ID ${employeeId} to Department ID ${departmentId}.`,
    );

    return updatedEmployee;
  }
}
