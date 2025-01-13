import { Controller, Post, Get, Delete, Param, Body, Patch } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { Role } from '../entities/role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(
    @Body('name') name: string,
    @Body('description') description?: string,
  ): Promise<Role> {
    return this.roleService.createRole(name, description);
  }

  @Get()
  async findAllRoles(): Promise<Role[]> {
    return this.roleService.fetchAllRoles();
  }

  @Get(':id')
  async findRoleById(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOneById(id);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<void> {
    return this.roleService.deleteRole(id);
  }

  @Patch('assign')
  async assignRoleToEmployee(
    @Body('employeeId') employeeId: string,
    @Body('roleId') roleId: string,
  ): Promise<{ message: string }> {
    await this.roleService.assignRoleToEmployee(employeeId, roleId);
    return { message: 'Role assigned successfully to the employee' };
  }
}
