import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsNumber()
  person_id: number;

  @IsNumber()
  type_id: number;

  @IsString()
  value: string;
}
