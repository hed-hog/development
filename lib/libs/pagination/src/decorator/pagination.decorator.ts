import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationParams } from '../types/pagination.types';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationParams => {
    const request = ctx.switchToHttp().getRequest();

    console.log(data);

    const { page, pageSize, search, field } = request.body;

    return { page, pageSize, search, field };
  },
);
