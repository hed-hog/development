import { IsString } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  value: string;
}
