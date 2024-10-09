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
import { itemTranslations } from '@hedhog/utils';

@Injectable()
export class PaginationService {
  private readonly logger = new Logger(PaginationService.name);

  async paginate<T, M extends BaseModel>(
    model: M,
    paginationParams: PaginationParams,
    customQuery?: FindManyArgs<M>,
    translationKey?: string,
  ): Promise<PaginatedResult<T>> {
    try {
      if (!model) {
        throw new BadRequestException('Model is required');
      }

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

      if (sortField) {
        const invalid = this.isInvalidField(sortField, model);
        if (invalid) {
          this.logger.error(`Invalid field: ${sortField}`);
          throw new BadRequestException(
            `Invalid field: ${sortField}. Valid columns are: ${this.extractFieldNames(
              model,
            ).join(', ')}`,
          );
        }

        sortOrderCondition = { [sortField]: sortOrder };
      }

      if (search) {
        if (typeof search !== 'string') {
          this.logger.error('Search must be a string');
          throw new BadRequestException('Search must be a string');
        }
      }

      if (fields) {
        const invalidFields = this.isInvalidFields(fields, model);

        if (invalidFields) {
          this.logger.error(
            `Invalid fields: ${sortField}. Valid columns are: ${this.extractFieldNames(
              model,
            ).join(', ')}`,
          );

          throw new BadRequestException(
            `Invalid fields: ${sortField}. Valid columns are: ${this.extractFieldNames(
              model,
            ).join(', ')}`,
          );
        }

        selectCondition = fields.reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {});
      }

      const skip = page > 0 ? pageSize * (page - 1) : 0;

      if (
        customQuery.where &&
        customQuery.where.OR &&
        customQuery.where.OR.length === 0
      ) {
        delete customQuery.where.OR;
      }

      const query: any = {
        select: selectCondition,
        where: customQuery?.where || {},
        orderBy: sortOrderCondition,
        take: pageSize,
        skip,
      };

      if (customQuery?.include) {
        query.include = customQuery?.include;
        delete query.select;
      }

      let [total, data] = await Promise.all([
        model.count({ where: customQuery?.where || {} }),
        model.findMany(query),
      ]);

      const lastPage = Math.ceil(total / pageSize);

      if (translationKey) {
        data = data.map((item: any) => itemTranslations(translationKey, item));
      }

      return {
        total,
        lastPage,
        page,
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

    console.log('extractFieldNames', { model });

    const fields = model.fields;

    for (const key in fields) {
      if (fields && fields.hasOwnProperty(key)) {
        fieldNames.push(key);
      }
    }

    return fieldNames;
  }

  isInvalidField(sortField: string, model: BaseModel): boolean {
    return model && model.fields ? !model.fields[sortField] : true;
  }

  isInvalidFields(fields: string[], model: BaseModel): boolean {
    return !fields.every((field) =>
      model.fields ? model && model.fields[field] : false,
    );
  }
}
