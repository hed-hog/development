import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationDTO } from '../dto/pagination.dto';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationDTO => {
    const request = ctx.switchToHttp().getRequest();

    const { page, pageSize, search, field, sortOrder, fields } =
      request.body as PaginationDTO;

    return { page, pageSize, search, field, sortOrder, fields };
  },
);
