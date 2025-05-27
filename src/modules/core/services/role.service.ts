import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '@adapters/repositories/role.repository';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService {
  private logger = new Logger(RoleService.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(name: string, description?: string): Promise<Role> {
    this.logger.log(`Creating role with name: ${name}`);
    return this.roleRepository.createRole({ name, description });
  }

  async fetchAllRoles(): Promise<Role[]> {
    this.logger.log('Fetching all roles');
    return this.roleRepository.getAllRoles();
  }

  async findOneById(roleId: string) {
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
    return role;
  }

  async deleteRole(id: string): Promise<void> {
    this.logger.log(`Deleting role by ID: ${id}`);
    await this.roleRepository.deleteRoleById(id);
  }

  async assignRoleToEmployee(employeeId: string, roleId: string): Promise<void> {
    this.logger.log(`Assigning role ID: ${roleId} to employee ID: ${employeeId}`);
    await this.roleRepository.assignRoleToEmployee(employeeId, roleId);
  }
}
