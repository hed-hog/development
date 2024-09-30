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
  ): any[] {
    const searchValue = paginationParams.search;
    const OR: any[] = [];

    fields.forEach((field) => {
      if (field === 'id' && !isNaN(+searchValue)) {
        OR.push({ id: { equals: +searchValue } });
      } else if (
        field === 'method' &&
        ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'].includes(
          searchValue,
        )
      ) {
        OR.push({ method: { equals: searchValue } });
      } else if (field !== 'method') {
        const condition = { [field]: { contains: searchValue } };

        if (this.isPostgres()) {
          (condition[field] as any).mode = 'insensitive';
        }

        OR.push(condition);
      }
    });

    if (!isNaN(+searchValue)) {
      OR.push({ id: { equals: +searchValue } });
    }

    return OR;
  }
}
