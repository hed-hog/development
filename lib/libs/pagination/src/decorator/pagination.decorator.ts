import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../constants/pagination.constants';
import { PageOrderDirection, PaginationField } from '../enums/patination.enums';
import { PaginationType } from '../types/pagination.types';

export const Pagination = createParamDecorator(
  (data: PaginationField, ctx: ExecutionContext): PaginationType => {
    const request = ctx.switchToHttp().getRequest();

    const defaultOptions: PaginationType = {
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
      search: '',
      sortField: 'id',
      sortOrder: PageOrderDirection.Asc,
      fields: '',
    };

    const requestData = request.body || request.query;

    const {
      page = defaultOptions.page,
      pageSize = defaultOptions.pageSize,
      search = defaultOptions.search,
      sortField = defaultOptions.sortField,

      sortOrder = defaultOptions.sortOrder,
      fields = defaultOptions.fields,
    } = requestData;

    if (data) {
      switch (data) {
        case PaginationField.Page:
        case PaginationField.PageSize:
          return requestData[data] ? +requestData[data] : defaultOptions[data];
        case PaginationField.OrderDirection:
          return requestData[data] || defaultOptions[data];
        default:
          return requestData[data];
      }
    }

    return {
      page: +page,
      pageSize: +pageSize,
      search,
      sortField,
      sortOrder: sortOrder as PageOrderDirection,
      fields,
    };
  },
);

// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { PaginationDTO } from '../dto/pagination.dto';

// export const Pagination = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext): PaginationDTO => {
//     const request = ctx.switchToHttp().getRequest();

//     const { page, pageSize, search, sortField, sortOrder, fields } =
//       request.body as PaginationDTO;

//     return { page, pageSize, search, sortField, sortOrder, fields };
//   },
// );
