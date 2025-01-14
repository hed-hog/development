import { IsNumber } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  btc_dominance: number;

  @IsNumber()
  btc_dominance_24h_percentage_change: number;

  @IsNumber()
  total_market_cap_yesterday_percentage_change: number;

  @IsNumber()
  total_market_cap: number;
}
