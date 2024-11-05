import { IsString, Length, IsBoolean } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  @Length(0, 255)
  slug: string;

  @IsString()
  type: string;

  @IsString()
  @Length(0, 1023)
  value: string;

  @IsBoolean()
  user_override: boolean;
}
