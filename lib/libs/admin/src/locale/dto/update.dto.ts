import { IsString, IsOptional } from 'class-validator';

export class UpdateDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  region?: string;
}
