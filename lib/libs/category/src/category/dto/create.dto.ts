import { IsString, IsNumber } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  slug: string;

  @IsNumber()
  category_id: number;
}
