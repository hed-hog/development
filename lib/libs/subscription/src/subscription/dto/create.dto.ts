import { IsNumber, IsString } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO extends WithLocaleDTO {
  @IsNumber()
  plan_id: number;

  @IsNumber()
  person_id: number;

  @IsNumber()
  payment_id: number;

  @IsString()
  start_at: string;

  @IsString()
  end_at: string;

  @IsString()
  status: string;
}
