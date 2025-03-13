import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { WithLocaleDTO } from '@hedhog/locale';

export class CreateDTO {
  @IsNumber()
  component_id: number;

  @IsNumber()
  dashboard_id: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  x_axis: number;

  @IsNumber()
  y_axis: number;
}
