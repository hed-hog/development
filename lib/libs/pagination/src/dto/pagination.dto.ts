import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
export class PaginationDTO {
  @IsOptional()
  @IsInt({ message: 'page must be an integer' })
  page: number;

  @IsOptional()
  @IsInt({ message: 'pageSize must be an integer' })
  pageSize: number;

  @IsOptional()
  @IsString({ message: 'search must be a string' })
  search: string;

  @IsOptional()
  @IsString({ message: 'field must be a string' })
  field: string;

  @IsOptional()
  @IsString({ message: 'sortOrder must be a string' })
  @IsEnum(['asc', 'desc'], { message: 'sortOrder must be asc or desc' })
  sortOrder: 'asc' | 'desc';

  @IsOptional()
  @IsString({ each: true, message: 'fields must be an array of strings' })
  @Min(1)
  fields: string[];
}
