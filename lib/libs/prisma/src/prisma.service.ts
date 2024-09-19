import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  getProvider() {
    return (this as any)._engineConfig.activeProvider;
  }

  isPostgres() {
    return this.getProvider() === 'postgresql';
  }

  isMysql() {
    return this.getProvider() === 'mysql';
  }

  createInsensitiveSearch(
    fields: string[],
    paginationParams: { search: string },
    prismaService: { getProvider: () => string },
  ): any[] {
    const OR = fields.map((field) => ({
      [field]: { contains: paginationParams.search },
    }));

    if (prismaService.getProvider() === 'postgres') {
      OR.forEach((condition) => {
        Object.keys(condition).forEach((key) => {
          (condition[key] as any).mode = 'insensitive';
        });
      });
    }

    return OR;
  }
}
