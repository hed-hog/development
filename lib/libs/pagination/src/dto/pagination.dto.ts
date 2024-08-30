import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
export class PaginationDTO {
  @IsOptional()
  @IsInt()
  page: number;

  @IsOptional()
  @IsInt()
  pageSize: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  field: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['asc', 'desc'])
  sortOrder: 'asc' | 'desc';

  @IsOptional()
  @IsString({ each: true, message: 'fields must be an array of strings' })
  @Min(1)
  fields: string[];
}
