import { IsString, IsNumber } from 'class-validator';

export class CreateDTO {
  @IsString()
  name: string;

  @IsNumber()
  user_id: number;

  @IsNumber()
  stock_exchange_id: number;

  @IsNumber()
  strategy_id: number;

  @IsNumber()
  balance: number;
}
