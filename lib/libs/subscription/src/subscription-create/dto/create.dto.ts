import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  plan_id: number;

  @IsEnum(['active', 'expired', 'canceled'])
  status: string;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsEnum(['admin', 'user'])
  role: string;

  @IsInt({ each: true })
  person_ids: number[];
}
