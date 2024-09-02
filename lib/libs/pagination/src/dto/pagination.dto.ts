import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { PageOrderDirection } from '../enums/patination.enums';
export class PaginationDTO {
  @IsOptional()
  @Transform((value) => Number(value))
  @IsInt({ message: 'page must be an integer' })
  page: number;

  @IsOptional()
  @Transform((value) => Number(value))
  @IsInt({ message: 'pageSize must be an integer' })
  pageSize: number;

  @IsOptional()
  @IsString({ message: 'search must be a string' })
  search: string;

  @IsOptional()
  @IsString({ message: 'field must be a string' })
  sortField: string;

  @IsOptional()
  @IsString({ message: 'sortOrder must be a string' })
  @IsEnum(PageOrderDirection, { message: 'sortOrder is not valid' })
  sortOrder: PageOrderDirection;

  @IsOptional()
  @IsString({ message: 'fields must be a string' })
  fields: string;
}
