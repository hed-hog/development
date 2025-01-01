import { IsString, IsOptional } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
