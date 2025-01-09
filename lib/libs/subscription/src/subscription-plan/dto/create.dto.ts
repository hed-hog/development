import { IsString } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  slug: string;

  @IsString()
  duration: string;
}
