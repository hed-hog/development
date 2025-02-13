import { IsString, IsNumber, IsOptional } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  slug: string;

  @IsString()
  duration: string;

  @IsOptional()
  @IsNumber()
  item_id?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
