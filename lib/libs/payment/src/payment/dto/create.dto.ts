import { IsDecimal, IsString, Length } from 'class-validator';

export class CreateDTO {
  @IsDecimal()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  payment_at: string;

  @IsString()
  status: string;

  @IsString()
  type: string;

  @IsString()
  @Length(0, 255)
  transaction_id: string;
}
