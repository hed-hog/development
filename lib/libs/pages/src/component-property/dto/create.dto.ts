import { IsInt, IsString, Length } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsInt()
  type_id: number;

  @IsInt()
  component_id: number;

  @IsString()
  @Length(0, 255)
  default: string;
}
