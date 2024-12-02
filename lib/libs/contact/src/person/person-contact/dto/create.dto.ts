import { IsNumber } from 'class-validator';
import { IsBoolean } from 'class-validator';
import { IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  type_id: number;

  @IsBoolean()
  primary: boolean;

  @IsString()
  value: string;
}
