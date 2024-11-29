import { IsString } from 'class-validator';
import { IsNumber } from 'class-validator';
import { IsOptional } from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  photo_id?: number;

  @IsNumber()
  type_id: number;

  @IsOptional()
  @IsString()
  birth_at?: string;
}
