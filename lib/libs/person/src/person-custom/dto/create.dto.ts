import { IsInt, IsString } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsInt()
  person_id: number;

  @IsInt()
  type_id: number;

  @IsString()
  value: string;
}
