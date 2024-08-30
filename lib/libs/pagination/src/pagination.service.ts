import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaginatedResult, PaginationParams } from './types/pagination.types';

@Injectable()
export class PaginationService {
  private readonly logger = new Logger(PaginationService.name);
  async paginate<
    T,
    M extends {
      findMany: Function;
      count: Function;
      fields: Record<string, any>;
    },
  >(model: M, paginationParams: PaginationParams): Promise<PaginatedResult<T>> {
    try {
      const page = Number(paginationParams.page || 1);
      const pageSize = Number(paginationParams.pageSize || 20);

      if (page < 1 || pageSize < 1) {
        throw new BadRequestException(
          'Page and pageSize must be greater than 0',
        );
      }

      let whereCondition = undefined;

      const { search, field } = paginationParams;

      if (search && field) {
        const fieldNames = this.extractFieldNames(model);

        if (!fieldNames.includes(field)) {
          throw new BadRequestException(
            `Invalid field: ${field}. Valid columns are: ${fieldNames.join(', ')}`,
          );
        }

        if (typeof field !== 'string') {
          throw new BadRequestException('Field must be a string');
        }

        if (typeof search !== 'string') {
          throw new BadRequestException('Search must be a string');
        }

        whereCondition = { [field]: { contains: search } };
      }

      const skip = page > 0 ? pageSize * (page - 1) : 0;

      const [total, data] = await Promise.all([
        model.count({ where: whereCondition }),
        model.findMany({
          where: whereCondition,
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
    } catch (error) {
      this.logger.error('Pagination Error:', error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException(`Failed to paginate: ${error.message}`);
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
