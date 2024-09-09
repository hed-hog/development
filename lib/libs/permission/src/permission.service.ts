import { PrismaService } from '@hedhog/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionService {
  constructor(private readonly prismaService: PrismaService) {}

  //   async listRoles() {
  //     return await this.prismaService.role.findMany();
  //   }

  //   async listPermissions() {
  //     return await this.prismaService.permission.findMany();
  //   }
}
