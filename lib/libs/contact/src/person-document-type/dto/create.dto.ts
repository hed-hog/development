import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsNumber()
  country_id: number;

  @IsString()
  slug: string;
}
