import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { PaginationOrderDirection } from '../decorator/pagination.decorator';

export class PaginationDTO {
  @IsOptional()
  @IsInt()
  page: number;

  @IsOptional()
  @IsInt()
  pageSize: number;

  @IsOptional()
  @IsString()
  orderField: string;

  @IsOptional()
  @IsEnum(PaginationOrderDirection)
  orderDirection: PaginationOrderDirection;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString({ each: true })
  @Min(1)
  fields: string[];
}
