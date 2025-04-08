import { IsNumber, IsString } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  wallet_id: number;

  @IsString()
  type: string;

  @IsNumber()
  amount: number;
}
