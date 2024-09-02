import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../constants/pagination.constants';
import { PageOrderDirection, PaginationField } from '../enums/patination.enums';
import { PaginationType } from '../types/pagination.types';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PaginationDTO } from '../dto/pagination.dto';

export const Pagination = createParamDecorator(
  async (data: PaginationField, ctx: ExecutionContext): PaginationType => {
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

    // Converta os dados para o DTO
    const paginationDto = plainToInstance(PaginationDTO, requestData);

    // Valide o DTO e rejeite se houver erros
    try {
      await validateOrReject(paginationDto);
    } catch (errors) {
      throw new BadRequestException(errors);
    }

    if (data) {
      return paginationDto[data];
    }
  },
);
