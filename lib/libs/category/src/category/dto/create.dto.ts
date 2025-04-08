import { WithLocaleDTO } from '@hedhog/locale';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  slug: string;

  @IsOptional()
  @IsNumber()
  category_id?: number;
}
