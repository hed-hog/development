import { IsString, Length, IsInt } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  @Length(0, 255)
  slug: string;

  @IsInt()
  instance_id: number;
}
