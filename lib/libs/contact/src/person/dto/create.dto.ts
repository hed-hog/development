import { IsString, IsNumber, IsOptional } from 'class-validator';

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
