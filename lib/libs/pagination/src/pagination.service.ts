import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
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
      const page = Number(paginationParams.page || 1);
      const pageSize = Number(paginationParams.pageSize || 20);

      if (page < 1 || pageSize < 1) {
        throw new BadRequestException(
          'Page and pageSize must be greater than 0',
        );
      }

      this.logger.debug({ customQuery });

      let whereCondition = undefined;
      let selectCondition = undefined;
      let sortOrderCondition = {};

      const { search, field, fields } = paginationParams;

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

        whereCondition = { [field]: { contains: search, mode: 'insensitive' } };

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

        sortOrderCondition = { [field]: paginationParams.sortOrder || 'asc' };
      }

      const skip = page > 0 ? pageSize * (page - 1) : 0;

      const query = {
        select: selectCondition,
        where: whereCondition,
        orderBy: sortOrderCondition,
        take: pageSize,
        skip,
      };

      console.log('\n\n-- query ----------------------------------------\n\n');
      console.log(query);
      console.log('\n\n--------------------------------------------------');

      const [total, data] = await Promise.all([
        model.count({ where: whereCondition }),
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

      throw new BadRequestException(`Failed to paginate: ${error.message}`);
    }
  }

  /**
   * Extracts the field names from a model.
   *
   * @param model The model to extract the field names from.
   * @returns The field names of the model.
   * @example
   * const fieldNames = this.extractFieldNames(model);
   * console.log(fieldNames); // ['id', 'name', 'email']
   */
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
