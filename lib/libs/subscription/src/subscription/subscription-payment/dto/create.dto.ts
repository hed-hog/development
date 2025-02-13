import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  payment_id: number;

  @IsString()
  start_at: string;

  @IsString()
  end_at: string;
}
