import { Controller, Get, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('roles')
  async listRoles() {
    return { msg: 'list-roles' };
  }

  @Get('permissions')
  async listPermissions() {
    return { msg: 'list-permissions' };
  }

  @Post('roles')
  async createRole() {
    return { msg: 'create-role' };
  }

  @Post('permissions')
  async createPermission() {
    return { msg: 'create-permission' };
  }

  @Post('role-permission')
  async createRolePermission() {
    return { msg: 'create-role-permission' };
  }

  @Post('role-user')
  async createRoleUser() {
    return { msg: 'create-role-user' };
  }
}
