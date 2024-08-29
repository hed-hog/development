import { Injectable } from '@nestjs/common';
import { PaginateFunction, PaginateOptions } from './types';
import { PrismaService } from '@hedhog/prisma';
import { PaginationOrderDirection } from './decorator/pagination.decorator';

@Injectable()
export class PaginationService {
  constructor(private prisma: PrismaService) {}

  async getColumns(model: any) {
    const databaseUrl = process.env.DATABASE_URL;
    let databaseName = databaseUrl?.split('/').pop();

    if (databaseName.includes('?')) {
      databaseName = databaseName.split('?')[0];
    }

    const databaseType = databaseUrl?.split('://')[0];

    if (['mysql', 'postgresql'].includes(databaseType)) {
      throw new Error(`Database ${databaseType} not supported yet`);
    }

    let result = [];

    switch (databaseType) {
      case 'mysql':
        result = await this.prisma.$queryRaw`
          SELECT COLUMN_NAME AS name
          FROM INFORMATION_SCHEMA.COLUMNS
          WHERE TABLE_NAME = '${model}' AND TABLE_SCHEMA = '${databaseName}';
      `;
        break;
      case 'postgresql':
        result = await this.prisma.$queryRaw`
          SELECT column_name AS name
          FROM information_schema.columns
          WHERE table_name = '${model}' AND table_catalog = '${databaseName}';
        `;
        break;
    }

    return result.map((column: { name: string }) => column.name);
  }

  getSelect(fields: string[]) {
    return (
      fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}) ??
      undefined
    );
  }

  getOrderBy(
    orderField: string = '',
    orderDirection: PaginationOrderDirection = PaginationOrderDirection.Asc,
  ) {
    return orderField
      ? {
          [orderField]: orderDirection,
        }
      : undefined;
  }

  getFn(
    defaultOptions: PaginateOptions = {
      page: 1,
      pageSize: 20,
      fields: undefined,
      orderDirection: undefined,
      orderField: undefined,
    },
  ): PaginateFunction {
    return async (model, args: any = { where: undefined }, options) => {
      const fields = await this.getColumns(model);

      if (options.fields) {
        args.select = this.getSelect(options.fields);
      }

      if (options.orderField) {
        args.orderBy = this.getOrderBy(
          options.orderField,
          options.orderDirection,
        );
      }

      if (args.orderBy) {
        for (const key in Object.keys(args.orderBy)) {
          if (!fields.includes(key)) {
            throw new Error(`Field ${key} not found`);
          }

          if (!['asc', 'desc'].includes(args.orderBy[key])) {
            throw new Error(`Order direction ${args.orderBy[key]} not found`);
          }
        }
      }

      if (args.select) {
        for (const key of args.select) {
          if (!fields.includes(key)) {
            throw new Error(`Field ${key} not found`);
          }
        }
      }

      const page = Number(options?.page || defaultOptions.page) || 1;
      const pageSize =
        Number(options?.pageSize || defaultOptions.pageSize) || 20;

      const skip = page > 0 ? pageSize * (page - 1) : 0;

      const [total, data] = await Promise.all([
        model.count({ where: args.where }),
        model.findMany({
          ...args,
          take: pageSize,
          skip,
        }),
      ]);

      const lastPage = Math.ceil(total / pageSize);

      return {
        total,
        lastPage,
        currentPage: page,
        pageSize,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
        data,
      };
    };
  }
}
