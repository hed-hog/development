import { WithLocaleDTO } from '@hedhog/locale';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  @IsNotEmpty()
  slug: string;
}
