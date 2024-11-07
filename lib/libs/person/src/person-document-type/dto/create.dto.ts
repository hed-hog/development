import { IsInt, IsString, Length } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsInt()
  country_id: number;

  @IsString()
  @Length(0, 255)
  slug: string;
}
