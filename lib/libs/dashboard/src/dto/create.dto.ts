import { WithLocaleDTO } from '@hedhog/locale';
import { IsJSON, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @ValidateIf((o) => typeof o.defaultConfig === 'string')
  @IsJSON()
  defaultConfig: object;
}
