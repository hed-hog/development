import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  coin_id: number;

  @IsNumber()
  type_id: number;

  @IsOptional()
  @IsNumber()
  monthly_performance?: number;

  @IsOptional()
  @IsNumber()
  weekly_performance?: number;

  @IsOptional()
  @IsNumber()
  negative_directional_indicator_14?: number;

  @IsOptional()
  @IsNumber()
  positive_directional_indicator_14?: number;

  @IsOptional()
  @IsNumber()
  average_directional_index_14?: number;

  @IsOptional()
  @IsNumber()
  exponential_moving_average_200?: number;

  @IsOptional()
  @IsNumber()
  simple_moving_average_10?: number;

  @IsOptional()
  @IsNumber()
  simple_moving_average_20?: number;

  @IsOptional()
  @IsNumber()
  simple_moving_average_30?: number;

  @IsOptional()
  @IsNumber()
  simple_moving_average_50?: number;

  @IsOptional()
  @IsNumber()
  simple_moving_average_100?: number;

  @IsOptional()
  @IsNumber()
  simple_moving_average_200?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  volatility?: number;

  @IsOptional()
  @IsNumber()
  opening?: number;

  @IsOptional()
  @IsNumber()
  all_time_high?: number;

  @IsOptional()
  @IsNumber()
  aroon_up_14?: number;

  @IsOptional()
  @IsNumber()
  aroon_down_14?: number;

  @IsOptional()
  @IsNumber()
  all_time_low?: number;

  @IsOptional()
  @IsNumber()
  bollinger_lower_band_20?: number;

  @IsOptional()
  @IsNumber()
  bollinger_upper_band_20?: number;

  @IsOptional()
  @IsNumber()
  donchian_channels_lower_band_20?: number;

  @IsOptional()
  @IsNumber()
  donchian_channels_upper_band_20?: number;

  @IsOptional()
  @IsNumber()
  bull_bear_power?: number;

  @IsOptional()
  @IsNumber()
  keltner_channels_lower_band_20?: number;

  @IsOptional()
  @IsNumber()
  keltner_channels_upper_band_20?: number;

  @IsOptional()
  @IsNumber()
  market_cap?: number;

  @IsOptional()
  @IsNumber()
  buy?: number;

  @IsOptional()
  @IsNumber()
  year_to_date_performance?: number;

  @IsOptional()
  @IsNumber()
  annual_performance?: number;

  @IsOptional()
  @IsNumber()
  six_month_performance?: number;

  @IsOptional()
  @IsNumber()
  three_month_performance?: number;

  @IsOptional()
  @IsNumber()
  stochastic_d?: number;

  @IsOptional()
  @IsNumber()
  stochastic_k?: number;

  @IsOptional()
  @IsNumber()
  gap_percent?: number;

  @IsOptional()
  @IsNumber()
  ichimoku_leading_span_a?: number;

  @IsOptional()
  @IsNumber()
  ichimoku_leading_span_b?: number;

  @IsOptional()
  @IsNumber()
  slow_stochastic_rsi?: number;

  @IsOptional()
  @IsNumber()
  fast_stochastic_rsi?: number;

  @IsOptional()
  @IsNumber()
  commodity_channel_index_20?: number;

  @IsOptional()
  @IsNumber()
  relative_strength_index_7?: number;

  @IsOptional()
  @IsNumber()
  relative_strength_index_14?: number;

  @IsOptional()
  @IsNumber()
  ichimoku_base_line?: number;

  @IsOptional()
  @IsNumber()
  ichimoku_conversion_line?: number;

  @IsOptional()
  @IsNumber()
  one_month_high?: number;

  @IsOptional()
  @IsNumber()
  fifty_two_week_high?: number;

  @IsOptional()
  @IsNumber()
  six_month_high?: number;

  @IsOptional()
  @IsNumber()
  three_month_high?: number;

  @IsOptional()
  @IsNumber()
  average_true_range_14?: number;

  @IsOptional()
  @IsNumber()
  average_daily_range_14?: number;

  @IsOptional()
  @IsNumber()
  hull_moving_average_9?: number;

  @IsOptional()
  @IsNumber()
  exponential_moving_average_5?: number;

  @IsOptional()
  @IsNumber()
  exponential_moving_average_10?: number;

  @IsOptional()
  @IsNumber()
  exponential_moving_average_20?: number;

  @IsOptional()
  @IsNumber()
  exponential_moving_average_30?: number;

  @IsOptional()
  @IsNumber()
  exponential_moving_average_50?: number;

  @IsOptional()
  @IsNumber()
  exponential_moving_average_100?: number;

  @IsOptional()
  @IsNumber()
  volume_weighted_moving_average_20?: number;

  @IsOptional()
  @IsNumber()
  simple_moving_average_5?: number;

  @IsOptional()
  @IsNumber()
  one_month_low?: number;

  @IsOptional()
  @IsNumber()
  fifty_two_week_low?: number;

  @IsOptional()
  @IsNumber()
  six_month_low?: number;

  @IsOptional()
  @IsNumber()
  three_month_low?: number;

  @IsOptional()
  @IsNumber()
  available_currencies?: number;

  @IsOptional()
  @IsNumber()
  momentum_10?: number;

  @IsOptional()
  @IsNumber()
  macd_level_12_26?: number;

  @IsOptional()
  @IsNumber()
  awesome_oscillator?: number;

  @IsOptional()
  @IsString()
  standard?: string;

  @IsOptional()
  @IsNumber()
  five_year_performance?: number;

  @IsOptional()
  @IsNumber()
  all_time_performance?: number;

  @IsOptional()
  @IsNumber()
  camarilla_pivot_p?: number;

  @IsOptional()
  @IsNumber()
  camarilla_pivot_r1?: number;

  @IsOptional()
  @IsNumber()
  camarilla_pivot_r2?: number;

  @IsOptional()
  @IsNumber()
  camarilla_pivot_r3?: number;

  @IsOptional()
  @IsNumber()
  camarilla_pivot_s1?: number;

  @IsOptional()
  @IsNumber()
  camarilla_pivot_s2?: number;

  @IsOptional()
  @IsNumber()
  camarilla_pivot_s3?: number;

  @IsOptional()
  @IsNumber()
  classic_pivot_p?: number;

  @IsOptional()
  @IsNumber()
  classic_pivot_r1?: number;

  @IsOptional()
  @IsNumber()
  classic_pivot_r2?: number;

  @IsOptional()
  @IsNumber()
  classic_pivot_r3?: number;

  @IsOptional()
  @IsNumber()
  classic_pivot_s1?: number;

  @IsOptional()
  @IsNumber()
  classic_pivot_s2?: number;

  @IsOptional()
  @IsNumber()
  classic_pivot_s3?: number;

  @IsOptional()
  @IsNumber()
  dm_pivot_p?: number;

  @IsOptional()
  @IsNumber()
  dm_pivot_r1?: number;

  @IsOptional()
  @IsNumber()
  dm_pivot_s1?: number;

  @IsOptional()
  @IsNumber()
  fibonacci_pivot_p?: number;

  @IsOptional()
  @IsNumber()
  fibonacci_pivot_r1?: number;

  @IsOptional()
  @IsNumber()
  fibonacci_pivot_r2?: number;

  @IsOptional()
  @IsNumber()
  fibonacci_pivot_r3?: number;

  @IsOptional()
  @IsNumber()
  fibonacci_pivot_s1?: number;

  @IsOptional()
  @IsNumber()
  fibonacci_pivot_s2?: number;

  @IsOptional()
  @IsNumber()
  fibonacci_pivot_s3?: number;

  @IsOptional()
  @IsNumber()
  woodie_pivot_p?: number;

  @IsOptional()
  @IsNumber()
  woodie_pivot_r1?: number;

  @IsOptional()
  @IsNumber()
  woodie_pivot_r2?: number;

  @IsOptional()
  @IsNumber()
  woodie_pivot_r3?: number;

  @IsOptional()
  @IsNumber()
  woodie_pivot_s1?: number;

  @IsOptional()
  @IsNumber()
  woodie_pivot_s2?: number;

  @IsOptional()
  @IsNumber()
  woodie_pivot_s3?: number;

  @IsOptional()
  @IsNumber()
  volume_weighted_average_price?: number;

  @IsOptional()
  @IsNumber()
  williams_percent_range_14?: number;

  @IsOptional()
  @IsNumber()
  parabolic_sar?: number;

  @IsOptional()
  @IsNumber()
  macd_signal_12_26?: number;

  @IsOptional()
  @IsNumber()
  rate_of_change_9?: number;

  @IsOptional()
  @IsNumber()
  total_units_currencies?: number;

  @IsOptional()
  @IsNumber()
  ultimate_oscillator?: number;

  @IsOptional()
  @IsNumber()
  diluted_market_value?: number;

  @IsOptional()
  @IsNumber()
  percentage_change?: number;

  @IsOptional()
  @IsNumber()
  change?: number;

  @IsOptional()
  @IsNumber()
  change_1h_percent?: number;

  @IsOptional()
  @IsNumber()
  change_1h?: number;

  @IsOptional()
  @IsNumber()
  change_1minute_percent?: number;

  @IsOptional()
  @IsNumber()
  change_1minute?: number;

  @IsOptional()
  @IsNumber()
  change_1month_percent?: number;

  @IsOptional()
  @IsNumber()
  change_1month?: number;

  @IsOptional()
  @IsNumber()
  change_1week_percent?: number;

  @IsOptional()
  @IsNumber()
  change_1week?: number;

  @IsOptional()
  @IsNumber()
  change_4hour_percent?: number;

  @IsOptional()
  @IsNumber()
  change_4hour?: number;

  @IsOptional()
  @IsNumber()
  change_5minute_percent?: number;

  @IsOptional()
  @IsNumber()
  change_5minute?: number;

  @IsOptional()
  @IsNumber()
  change_15minute_percent?: number;

  @IsOptional()
  @IsNumber()
  change_15minute?: number;

  @IsOptional()
  @IsNumber()
  percentage_change_from_open?: number;

  @IsOptional()
  @IsNumber()
  change_from_open?: number;

  @IsOptional()
  @IsNumber()
  percentage_change_in_24h_volume?: number;

  @IsOptional()
  @IsNumber()
  sell?: number;

  @IsOptional()
  @IsNumber()
  monthly_volatility?: number;

  @IsOptional()
  @IsNumber()
  weekly_volatility?: number;

  @IsOptional()
  @IsNumber()
  volume?: number;

  @IsOptional()
  @IsNumber()
  volume_24h_usd?: number;

  @IsOptional()
  @IsNumber()
  average_volume_10_days?: number;

  @IsOptional()
  @IsNumber()
  average_volume_30_days?: number;

  @IsOptional()
  @IsNumber()
  average_volume_60_days?: number;

  @IsOptional()
  @IsNumber()
  average_volume_90_days?: number;

  @IsOptional()
  @IsNumber()
  traded_volume?: number;

  @IsOptional()
  @IsNumber()
  relative_volume?: number;

  @IsOptional()
  @IsNumber()
  time_relative_volume?: number;

  @IsOptional()
  @IsNumber()
  maximum?: number;

  @IsOptional()
  @IsNumber()
  minimum?: number;

  @IsNumber()
  moving_averages_rating_id: number;

  @IsNumber()
  oscillators_rating_id: number;

  @IsNumber()
  technical_rating_id: number;

  @IsNumber()
  stock_exchange_id: number;
}
