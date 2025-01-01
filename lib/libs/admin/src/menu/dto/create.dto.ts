import { IsNumber, IsString, IsOptional } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsOptional()
  @IsNumber()
  menu_id?: number;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsString()
  order: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
