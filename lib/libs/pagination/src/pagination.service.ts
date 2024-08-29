import { Injectable } from '@nestjs/common';
import { PaginateFunction, PaginateOptions } from './types';

@Injectable()
export class PaginationService {
  paginate(
    defaultOptions: PaginateOptions = {
      page: 1,
      pageSize: 20,
    },
  ): PaginateFunction {
    return async (model, args: any = { where: undefined }, options) => {
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
