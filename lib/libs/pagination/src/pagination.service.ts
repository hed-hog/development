import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from './constants/pagination.constants';
import { PageOrderDirection } from './enums/patination.enums';
import type {
  BaseModel,
  FindManyArgs,
  PaginatedResult,
  PaginationParams,
} from './types/pagination.types';

@Injectable()
export class PaginationService {
  private readonly logger = new Logger(PaginationService.name);

  async paginate<T, M extends BaseModel>(
    model: M,
    paginationParams: PaginationParams,
    customQuery?: FindManyArgs<M>,
  ): Promise<PaginatedResult<T>> {
    try {
      const page = Number(paginationParams.page || DEFAULT_PAGE);
      const pageSize = Number(paginationParams.pageSize || DEFAULT_PAGE_SIZE);
      const search = paginationParams.search || null;
      const sortField = paginationParams.sortField || null;
      const sortOrder = paginationParams.sortOrder || PageOrderDirection.Asc;
      const fields = paginationParams.fields
        ? paginationParams.fields.split(',')
        : null;

      if (page < 1 || pageSize < 1) {
        throw new BadRequestException(
          'Page and pageSize must be greater than 0',
        );
      }

      let selectCondition = undefined;
      let sortOrderCondition: any = {
        id: paginationParams.sortOrder || PageOrderDirection.Asc,
      };

      if (search && sortField) {
        const fieldNames = this.extractFieldNames(model);

        if (!fieldNames.includes(sortField)) {
          throw new BadRequestException(
            `Invalid field: ${sortField}. Valid columns are: ${fieldNames.join(', ')}`,
          );
        }

        if (typeof sortField !== 'string') {
          throw new BadRequestException('Field must be a string');
        }
      }

      if (sortField) {
        sortOrderCondition = { [sortField]: sortOrder };
      }

      if (fields) {
        const fieldNames = this.extractFieldNames(model);
        const invalidFields = fields.filter(
          (field) => !fieldNames.includes(field),
        );
        if (invalidFields.length > 0) {
          throw new BadRequestException(
            `Invalid fields: ${invalidFields.join(', ')}. Valid columns are: ${fieldNames.join(', ')}`,
          );
        }
        selectCondition = fields.reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {});
      }

      const skip = page > 0 ? pageSize * (page - 1) : 0;

      const query = {
        select: selectCondition,
        where: customQuery?.where || {},
        orderBy: sortOrderCondition,
        take: pageSize,
        skip,
      };

      const [total, data] = await Promise.all([
        model.count({ where: customQuery?.where || {} }),
        model.findMany(query),
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
    } catch (error) {
      this.logger.error('Pagination Error:', error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException(`Failed to paginate: ${error}`);
    }
  }

  extractFieldNames(model: Record<string, any>): string[] {
    const fieldNames: string[] = [];

    const fields = model.fields;

    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        fieldNames.push(key);
      }
    }

    return fieldNames;
  }
}
