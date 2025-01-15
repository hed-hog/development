import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  type_id: number;

  @IsString()
  message: string;

  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsOptional()
  @IsNumber()
  coin_id?: number;
}
