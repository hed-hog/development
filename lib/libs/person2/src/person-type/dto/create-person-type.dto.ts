import { WithLocaleDTO } from '@hedhog/locale';
import { IsString } from 'class-validator';

export class CreatePersonTypeDTO extends WithLocaleDTO {
  @IsString()
  slug: string;
}
