import { IsNumber, IsString, IsOptional } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsNumber()
  type_id: number;

  @IsOptional()
  @IsString()
  value?: string;
}
