import { IsNumber, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  user_id: number;

  @IsNumber()
  banking_id: number;

  @IsNumber()
  stock_exchange_id: number;

  @IsNumber()
  strategy_id: number;

  @IsNumber()
  trade_signal_type_id: number;

  @IsNumber()
  coin_id: number;

  @IsNumber()
  layers: number;

  @IsOptional()
  @IsNumber()
  leverage?: number;
}
