import { IsNumber, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsOptional()
  @IsNumber()
  btc_dominance?: number;

  @IsOptional()
  @IsNumber()
  btc_dominance_24h_percentage_change?: number;

  @IsOptional()
  @IsNumber()
  total_market_cap_yesterday_percentage_change?: number;

  @IsOptional()
  @IsNumber()
  total_market_cap?: number;

  @IsOptional()
  @IsNumber()
  btc_future?: number;

  @IsOptional()
  @IsNumber()
  btc_future_change?: number;
}
