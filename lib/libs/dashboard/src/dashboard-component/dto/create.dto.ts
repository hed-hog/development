import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  slug: string;

  @IsString()
  path: string;

  @IsOptional()
  @IsNumber()
  min_width?: number;

  @IsOptional()
  @IsNumber()
  max_width?: number;

  @IsOptional()
  @IsNumber()
  min_height?: number;

  @IsOptional()
  @IsNumber()
  max_height?: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsOptional()
  @IsBoolean()
  is_resizable?: boolean;
}
