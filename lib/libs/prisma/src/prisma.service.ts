import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  [key: string]: any;

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

    if (!searchValue) {
      return OR;
    }

    fields.forEach((field) => {
      if (field === 'id' && !isNaN(+searchValue) && +searchValue > 0) {
        OR.push({ id: { equals: +searchValue } });
      } else if (
        field === 'method' &&
        ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'].includes(
          searchValue,
        )
      ) {
        OR.push({ method: { equals: searchValue } });
      } else if (field !== 'method') {
        if (typeof searchValue === 'string') {
          const condition = { [field]: { contains: searchValue } };

          if (this.isPostgres()) {
            (condition[field] as any).mode = 'insensitive';
          }

          OR.push(condition);
        }
      }
    });

    if (!isNaN(+searchValue) && +searchValue > 0) {
      OR.push({ id: { equals: +searchValue } });
    }

    return OR;
  }

  getFields(modelName: string) {
    const fields = this[modelName]?.fields
      ? Object.keys(this[modelName].fields)
      : null;
    return fields;
  }

  getValidData(modelName: string, data: any) {
    const validData: any = {};

    for (const fieldName of this.getFields(modelName)) {
      validData[fieldName] = data[fieldName];
    }

    return validData;
  }
}
