import { EntityManager, FindOneOptions, Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@modules/core/entities/role.entity';
import { Employee } from '@modules/core/entities/employee.entity';

@Injectable()
export class RoleRepository extends Repository<Role> {
  private logger = new Logger(RoleRepository.name);

  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private entityManager: EntityManager,
  ) {
    super(roleRepository.target, roleRepository.manager, roleRepository.queryRunner);
  }

  async createRole(roleData: Partial<Role>): Promise<Role> {
    const role = this.create(roleData);
    return await this.save(role);
  }

  async findRoleAndFailIfExist(id: FindOneOptions<Role>): Promise<void> {
    const RoleEntity = await this.findOne(id);
    if (RoleEntity) {
      this.logger.error(`This role already exists`);
      throw new BadRequestException(`This role already exists`);
    }
  }

  async findRoleAndFailIfNotExist(id: FindOneOptions<Role>): Promise<Role> {
    const role = await this.findOne(id);
    if (!role) {
      this.logger.error(`Role not found`);
      throw new BadRequestException(`Role not found`);
    }
    return role;
  }

  async updateRole(id: FindOneOptions<Role>, updateData: Partial<Role>): Promise<Role | undefined> {
    await this.update(id as string, updateData);
    return this.findRoleAndFailIfNotExist(id);
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.find();
  }

  async deleteRoleById(roleId: string): Promise<void> {
    const role = await this.findRoleAndFailIfNotExist({ where: { id: roleId } });
    await this.remove(role);
    this.logger.log(`Role with ID ${roleId} deleted successfully.`);
  }

  async assignRoleToEmployee(employeeId: string, roleId: string): Promise<void> {
    // Updated method
    const role = await this.findRoleAndFailIfNotExist({ where: { id: roleId } });
    const employee = await this.entityManager.findOne(Employee, { where: { id: employeeId } });

    if (!employee) {
      this.logger.error(`Employee with ID ${employeeId} not found.`);
      throw new BadRequestException(`Employee not found.`);
    }

    employee.role = role; // Assign the role to the employee
    await this.entityManager.save(employee);
    this.logger.log(
      `Role with ID ${roleId} assigned to Employee with ID ${employeeId} successfully.`,
    );
  }
}
