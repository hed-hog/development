import { WithLocaleDTO } from '@hedhog/locale';
import { IsString } from 'class-validator';

export class CreateDTO extends WithLocaleDTO {
  @IsString({ message: 'O slug deve ser um texto' })
  slug: string;
}
