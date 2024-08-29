import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export enum PaginationOrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum PaginationField {
  Page = 'page',
  PageSize = 'pageSize',
  OrderField = 'orderField',
  OrderDirection = 'orderDirection',
  Search = 'search',
}

export type PaginationType =
  | string
  | number
  | {
      page: number;
      pageSize: number;
      orderField: string;
      orderDirection: PaginationOrderDirection;
      search: string;
    };

export const Pagination = createParamDecorator(
  (data: PaginationField, ctx: ExecutionContext): PaginationType => {
    const request = ctx.switchToHttp().getRequest();
    const defaultOptions = {
      page: 1,
      pageSize: 20,
      orderDirection: 'asc',
      search: '',
    };
    const {
      page = defaultOptions.page,
      pageSize = defaultOptions.pageSize,
      orderField,
      orderDirection = defaultOptions.orderDirection,
      search = defaultOptions.search,
    } = request.query;

    if (data) {
      switch (data) {
        case PaginationField.Page:
        case PaginationField.PageSize:
          return request.query[data]
            ? +request.query[data]
            : defaultOptions[data];
        case PaginationField.OrderDirection:
          return request.query[data] || defaultOptions[data];
        default:
          return request.query[data];
      }
    }

    return {
      page: +page,
      pageSize: +pageSize,
      orderField,
      orderDirection,
      search,
    };
  },
);
