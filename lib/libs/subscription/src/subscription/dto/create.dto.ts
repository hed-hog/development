import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  plan_id: number;

  @IsEnum(['active', 'expired', 'canceled'])
  status: string;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
