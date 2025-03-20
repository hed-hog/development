import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDTO {
  @IsOptional()
  @IsNumber()
  payment_id: number;

  @IsString()
  start_at: string;

  @IsString()
  end_at: string;
}
