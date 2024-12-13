import { Coin } from './Coin';
import { QuotationType } from './QuotationType';
import { TrendType } from './TrendType';
import { StockExchange } from './StockExchange';

export type Quotation = {
  id?: number;
  coin_id: number;
  type_id: number;
  monthly_performance?: any;
  weekly_performance?: any;
  negative_directional_indicator_14?: any;
  positive_directional_indicator_14?: any;
  average_directional_index_14?: any;
  exponential_moving_average_200?: any;
  simple_moving_average_10?: any;
  simple_moving_average_20?: any;
  simple_moving_average_30?: any;
  simple_moving_average_50?: any;
  simple_moving_average_100?: any;
  simple_moving_average_200?: any;
  price?: any;
  volatility?: any;
  opening?: any;
  all_time_high?: any;
  aroon_up_14?: any;
  aroon_down_14?: any;
  all_time_low?: any;
  bollinger_lower_band_20?: any;
  bollinger_upper_band_20?: any;
  donchian_channels_lower_band_20?: any;
  donchian_channels_upper_band_20?: any;
  bull_bear_power?: any;
  keltner_channels_lower_band_20?: any;
  keltner_channels_upper_band_20?: any;
  market_cap?: any;
  buy?: any;
  year_to_date_performance?: any;
  annual_performance?: any;
  six_month_performance?: any;
  three_month_performance?: any;
  stochastic_d?: any;
  stochastic_k?: any;
  gap_percent?: any;
  ichimoku_leading_span_a?: any;
  ichimoku_leading_span_b?: any;
  slow_stochastic_rsi?: any;
  fast_stochastic_rsi?: any;
  commodity_channel_index_20?: any;
  relative_strength_index_7?: any;
  relative_strength_index_14?: any;
  ichimoku_base_line?: any;
  ichimoku_conversion_line?: any;
  one_month_high?: any;
  fifty_two_week_high?: any;
  six_month_high?: any;
  three_month_high?: any;
  average_true_range_14?: any;
  average_daily_range_14?: any;
  hull_moving_average_9?: any;
  exponential_moving_average_5?: any;
  exponential_moving_average_10?: any;
  exponential_moving_average_20?: any;
  exponential_moving_average_30?: any;
  exponential_moving_average_50?: any;
  exponential_moving_average_100?: any;
  volume_weighted_moving_average_20?: any;
  simple_moving_average_5?: any;
  one_month_low?: any;
  fifty_two_week_low?: any;
  six_month_low?: any;
  three_month_low?: any;
  available_currencies?: any;
  momentum_10?: any;
  macd_level_12_26?: any;
  awesome_oscillator?: any;
  standard?: string;
  five_year_performance?: any;
  all_time_performance?: any;
  camarilla_pivot_p?: any;
  camarilla_pivot_r1?: any;
  camarilla_pivot_r2?: any;
  camarilla_pivot_r3?: any;
  camarilla_pivot_s1?: any;
  camarilla_pivot_s2?: any;
  camarilla_pivot_s3?: any;
  classic_pivot_p?: any;
  classic_pivot_r1?: any;
  classic_pivot_r2?: any;
  classic_pivot_r3?: any;
  classic_pivot_s1?: any;
  classic_pivot_s2?: any;
  classic_pivot_s3?: any;
  dm_pivot_p?: any;
  dm_pivot_r1?: any;
  dm_pivot_s1?: any;
  fibonacci_pivot_p?: any;
  fibonacci_pivot_r1?: any;
  fibonacci_pivot_r2?: any;
  fibonacci_pivot_r3?: any;
  fibonacci_pivot_s1?: any;
  fibonacci_pivot_s2?: any;
  fibonacci_pivot_s3?: any;
  woodie_pivot_p?: any;
  woodie_pivot_r1?: any;
  woodie_pivot_r2?: any;
  woodie_pivot_r3?: any;
  woodie_pivot_s1?: any;
  woodie_pivot_s2?: any;
  woodie_pivot_s3?: any;
  volume_weighted_average_price?: any;
  williams_percent_range_14?: any;
  parabolic_sar?: any;
  macd_signal_12_26?: any;
  rate_of_change_9?: any;
  total_units_currencies?: any;
  ultimate_oscillator?: any;
  diluted_market_value?: any;
  percentage_change?: any;
  change?: any;
  change_1h_percent?: any;
  change_1h?: any;
  change_1minute_percent?: any;
  change_1minute?: any;
  change_1month_percent?: any;
  change_1month?: any;
  change_1week_percent?: any;
  change_1week?: any;
  change_4hour_percent?: any;
  change_4hour?: any;
  change_5minute_percent?: any;
  change_5minute?: any;
  change_15minute_percent?: any;
  change_15minute?: any;
  percentage_change_from_open?: any;
  change_from_open?: any;
  percentage_change_in_24h_volume?: any;
  sell?: any;
  monthly_volatility?: any;
  weekly_volatility?: any;
  volume?: any;
  volume_24h_usd?: any;
  average_volume_10_days?: any;
  average_volume_30_days?: any;
  average_volume_60_days?: any;
  average_volume_90_days?: any;
  traded_volume?: any;
  relative_volume?: any;
  time_relative_volume?: any;
  maximum?: any;
  minimum?: any;
  moving_averages_rating_id: number;
  oscillators_rating_id: number;
  technical_rating_id: number;
  stock_exchange_id: number;
  created_at?: string;
  updated_at?: string;
  coin?: Coin;
  quotation_type?: QuotationType;
  trend_type?: TrendType;
  trend_type_quotation_oscillators_rating_idTotrend_type?: TrendType;
  trend_type_quotation_technical_rating_idTotrend_type?: TrendType;
  stock_exchange?: StockExchange;
}