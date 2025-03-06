import { WithLocaleDTO } from '@hedhog/locale';
import { IsString, IsNotEmpty, IsJSON } from 'class-validator';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @IsJSON()
  defaultConfig: object;
}
