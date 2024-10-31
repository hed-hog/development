import { IsInt, IsDecimal, IsString, IsDate, Length } from 'class-validator';

export class CreateDTO {
  @IsInt()
  status_id: number;

  @IsInt()
  gateway_id: number;

  @IsInt()
  person_id: number;

  @IsDecimal()
  amount: number;

  @IsString()
  currency: string;

  @IsDate()
  paid_at: Date;

  @IsString()
  @Length(0, 255)
  transaction_id: string;
}
