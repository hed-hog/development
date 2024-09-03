import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../constants/pagination.constants';
import { PaginationDTO } from '../dto/pagination.dto';
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

    const requestData = {
      ...defaultOptions,
      ...(request.body || {}),
      ...(request.query || {}),
    };

    const {
      page = defaultOptions.page,
      pageSize = defaultOptions.pageSize,
      search = defaultOptions.search,
      sortField = defaultOptions.sortField,
      sortOrder = defaultOptions.sortOrder,
      fields = defaultOptions.fields,
    } = requestData;

    const validSortOrder = Object.values(PageOrderDirection).includes(sortOrder)
      ? sortOrder
      : defaultOptions.sortOrder;

    const finalData = {
      page,
      pageSize,
      search,
      sortField,
      sortOrder: validSortOrder,
      fields,
    };

    const paginationDtoInstance = plainToClass(PaginationDTO, finalData);

    const errors = validateSync(paginationDtoInstance);

    if (errors.length > 0) {
      throw new BadRequestException(
        'Pagination data is not valid according to PaginationDto: ' +
          errors
            .map((error) => Object.values(error.constraints).join(', '))
            .join(', '),
      );
    }

    if (data) {
      switch (data) {
        case PaginationField.Page:
        case PaginationField.PageSize:
          return finalData[data] ? +finalData[data] : defaultOptions[data];
        case PaginationField.SortOrder:
          return validSortOrder || defaultOptions[data];
        default:
          return finalData[data];
      }
    }

    return finalData;
  },
);
