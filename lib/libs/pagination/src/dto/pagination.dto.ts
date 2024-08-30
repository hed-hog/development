import { IsInt, IsOptional, IsString, Min } from 'class-validator';
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
  orderDirection: any;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsString({ each: true })
  @Min(1)
  fields: string[];
}
