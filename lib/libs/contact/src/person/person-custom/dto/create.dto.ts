import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsNumber()
  type_id: number;

  @IsOptional()
  @IsString()
  value?: string;
}
