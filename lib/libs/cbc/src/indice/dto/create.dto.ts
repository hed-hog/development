import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsOptional()
  @IsNumber()
  bot_id?: number;

  @IsNumber()
  type_id: number;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  in_inght_var_percentage?: number;

  @IsOptional()
  @IsNumber()
  in_inght_tech_rating?: number;

  @IsOptional()
  @IsNumber()
  future_var_percentage?: number;

  @IsOptional()
  @IsNumber()
  future_tech_rating?: number;
}
