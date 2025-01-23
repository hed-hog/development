import { IsNumber, IsString } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsNumber()
  type_id: number;

  @IsString()
  slug: string;
}
