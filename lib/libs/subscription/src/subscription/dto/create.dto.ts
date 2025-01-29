import { IsNumber, IsString, IsOptional } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsNumber()
  plan_id: number;

  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
