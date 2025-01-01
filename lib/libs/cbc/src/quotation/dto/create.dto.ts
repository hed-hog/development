import { IsNumber, IsOptional } from 'class-validator';

export class CreateDTO {
  @IsNumber()
  quotation_request_type_id: number;

  @IsNumber()
  bot_id: number;

  @IsNumber()
  coin_id: number;

  @IsOptional()
  @IsNumber()
  open?: number;

  @IsOptional()
  @IsNumber()
  high_all?: number;

  @IsOptional()
  @IsNumber()
  aroon_up?: number;

  @IsOptional()
  @IsNumber()
  aroon_down?: number;

  @IsOptional()
  @IsNumber()
  low_all?: number;

  @IsOptional()
  @IsNumber()
  bb_lower?: number;

  @IsOptional()
  @IsNumber()
  bb_upper?: number;

  @IsOptional()
  @IsNumber()
  donchch20_lower?: number;

  @IsOptional()
  @IsNumber()
  donchch20_upper?: number;

  @IsOptional()
  @IsNumber()
  stock_exchange_id?: number;

  @IsOptional()
  @IsNumber()
  bbpower?: number;

  @IsOptional()
  @IsNumber()
  kltchnl_lower?: number;

  @IsOptional()
  @IsNumber()
  kltchnl_upper?: number;

  @IsOptional()
  @IsNumber()
  market_cap_calc?: number;

  @IsOptional()
  @IsNumber()
  recommend_ma?: number;

  @IsOptional()
  @IsNumber()
  recommend_other?: number;

  @IsOptional()
  @IsNumber()
  bid?: number;

  @IsOptional()
  @IsNumber()
  perf_ytd?: number;

  @IsOptional()
  @IsNumber()
  perf_y?: number;

  @IsOptional()
  @IsNumber()
  perf_6m?: number;

  @IsOptional()
  @IsNumber()
  perf_3m?: number;

  @IsOptional()
  @IsNumber()
  perf_1m?: number;

  @IsOptional()
  @IsNumber()
  perf_w?: number;

  @IsOptional()
  @IsNumber()
  stoch_d?: number;

  @IsOptional()
  @IsNumber()
  stoch_k?: number;

  @IsOptional()
  @IsNumber()
  gap?: number;

  @IsOptional()
  @IsNumber()
  ichimoku_lead1?: number;

  @IsOptional()
  @IsNumber()
  ichimoku_lead2?: number;

  @IsOptional()
  @IsNumber()
  stoch_rsi_d?: number;

  @IsOptional()
  @IsNumber()
  stoch_rsi_k?: number;

  @IsOptional()
  @IsNumber()
  adx_minus_di?: number;

  @IsOptional()
  @IsNumber()
  adx_plus_di?: number;

  @IsOptional()
  @IsNumber()
  cci20?: number;

  @IsOptional()
  @IsNumber()
  rsi7?: number;

  @IsOptional()
  @IsNumber()
  rsi?: number;

  @IsOptional()
  @IsNumber()
  adx?: number;

  @IsOptional()
  @IsNumber()
  ichimoku_bline?: number;

  @IsOptional()
  @IsNumber()
  ichimoku_cline?: number;

  @IsOptional()
  @IsNumber()
  high_1m?: number;

  @IsOptional()
  @IsNumber()
  price_52_week_high?: number;

  @IsOptional()
  @IsNumber()
  high_6m?: number;

  @IsOptional()
  @IsNumber()
  high_3m?: number;

  @IsOptional()
  @IsNumber()
  atr?: number;

  @IsOptional()
  @IsNumber()
  adr?: number;

  @IsOptional()
  @IsNumber()
  hullma9?: number;

  @IsOptional()
  @IsNumber()
  ema5?: number;

  @IsOptional()
  @IsNumber()
  ema10?: number;

  @IsOptional()
  @IsNumber()
  ema20?: number;

  @IsOptional()
  @IsNumber()
  ema30?: number;

  @IsOptional()
  @IsNumber()
  ema50?: number;

  @IsOptional()
  @IsNumber()
  ema100?: number;

  @IsOptional()
  @IsNumber()
  ema200?: number;

  @IsOptional()
  @IsNumber()
  vwma?: number;

  @IsOptional()
  @IsNumber()
  sma5?: number;

  @IsOptional()
  @IsNumber()
  sma10?: number;

  @IsOptional()
  @IsNumber()
  sma20?: number;

  @IsOptional()
  @IsNumber()
  sma30?: number;

  @IsOptional()
  @IsNumber()
  sma50?: number;

  @IsOptional()
  @IsNumber()
  sma100?: number;

  @IsOptional()
  @IsNumber()
  sma200?: number;

  @IsOptional()
  @IsNumber()
  low_1m?: number;

  @IsOptional()
  @IsNumber()
  price_52_week_low?: number;

  @IsOptional()
  @IsNumber()
  low_6m?: number;

  @IsOptional()
  @IsNumber()
  low_3m?: number;

  @IsOptional()
  @IsNumber()
  total_shares_outstanding?: number;

  @IsOptional()
  @IsNumber()
  mom?: number;

  @IsOptional()
  @IsNumber()
  macd_macd?: number;

  @IsOptional()
  @IsNumber()
  ao?: number;

  @IsOptional()
  @IsNumber()
  perf_5y?: number;

  @IsOptional()
  @IsNumber()
  perf_all?: number;

  @IsOptional()
  @IsNumber()
  close?: number;

  @IsOptional()
  @IsNumber()
  vwap?: number;

  @IsOptional()
  @IsNumber()
  w_r?: number;

  @IsOptional()
  @IsNumber()
  p_sar?: number;

  @IsOptional()
  @IsNumber()
  macd_signal?: number;

  @IsOptional()
  @IsNumber()
  roc?: number;

  @IsOptional()
  @IsNumber()
  recommend_all?: number;

  @IsOptional()
  @IsNumber()
  total_shares_diluted?: number;

  @IsOptional()
  @IsNumber()
  uo?: number;

  @IsOptional()
  @IsNumber()
  market_cap_diluted_calc?: number;

  @IsOptional()
  @IsNumber()
  change?: number;

  @IsOptional()
  @IsNumber()
  change_abs?: number;

  @IsOptional()
  @IsNumber()
  change_from_open?: number;

  @IsOptional()
  @IsNumber()
  change_from_open_abs?: number;

  @IsOptional()
  @IsNumber()
  ask?: number;

  @IsOptional()
  @IsNumber()
  volatility_d?: number;

  @IsOptional()
  @IsNumber()
  volatility_m?: number;

  @IsOptional()
  @IsNumber()
  volatility_w?: number;

  @IsOptional()
  @IsNumber()
  volume?: number;

  @IsOptional()
  @IsNumber()
  average_volume_10d_calc?: number;

  @IsOptional()
  @IsNumber()
  average_volume_30d_calc?: number;

  @IsOptional()
  @IsNumber()
  average_volume_60d_calc?: number;

  @IsOptional()
  @IsNumber()
  average_volume_90d_calc?: number;

  @IsOptional()
  @IsNumber()
  total_value_traded?: number;

  @IsOptional()
  @IsNumber()
  relative_volume_10d_calc?: number;

  @IsOptional()
  @IsNumber()
  high?: number;

  @IsOptional()
  @IsNumber()
  low?: number;

  @IsOptional()
  @IsNumber()
  description?: number;

  @IsOptional()
  @IsNumber()
  type?: number;

  @IsOptional()
  @IsNumber()
  subtype?: number;

  @IsOptional()
  @IsNumber()
  update_mode?: number;

  @IsOptional()
  @IsNumber()
  pricescale?: number;

  @IsOptional()
  @IsNumber()
  minmov?: number;

  @IsOptional()
  @IsNumber()
  fractional?: number;

  @IsOptional()
  @IsNumber()
  minmove2?: number;

  @IsOptional()
  @IsNumber()
  rec_bbpower?: number;

  @IsOptional()
  @IsNumber()
  stoch_k_1_?: number;

  @IsOptional()
  @IsNumber()
  stoch_d_1_?: number;

  @IsOptional()
  @IsNumber()
  rec_stoch_rsi?: number;

  @IsOptional()
  @IsNumber()
  cci20_1_?: number;

  @IsOptional()
  @IsNumber()
  rsi7_1_?: number;

  @IsOptional()
  @IsNumber()
  rsi_1_?: number;

  @IsOptional()
  @IsNumber()
  adx_plus_di_1_?: number;

  @IsOptional()
  @IsNumber()
  adx_minus_di_1_?: number;

  @IsOptional()
  @IsNumber()
  rec_ichimoku?: number;

  @IsOptional()
  @IsNumber()
  rec_hullma9?: number;

  @IsOptional()
  @IsNumber()
  rec_vwma?: number;

  @IsOptional()
  @IsNumber()
  mom_1_?: number;

  @IsOptional()
  @IsNumber()
  ao_1_?: number;

  @IsOptional()
  @IsNumber()
  ao_2_?: number;

  @IsOptional()
  @IsNumber()
  candle_doji?: number;

  @IsOptional()
  @IsNumber()
  candle_abandonedbaby_bullish?: number;

  @IsOptional()
  @IsNumber()
  candle_abandonedbaby_bearish?: number;

  @IsOptional()
  @IsNumber()
  candle_doji_dragonfly?: number;

  @IsOptional()
  @IsNumber()
  candle_hangingman?: number;

  @IsOptional()
  @IsNumber()
  candle_engulfing_bullish?: number;

  @IsOptional()
  @IsNumber()
  candle_engulfing_bearish?: number;

  @IsOptional()
  @IsNumber()
  candle_shootingstar?: number;

  @IsOptional()
  @IsNumber()
  candle_morningstar?: number;

  @IsOptional()
  @IsNumber()
  candle_eveningstar?: number;

  @IsOptional()
  @IsNumber()
  candle_doji_gravestone?: number;

  @IsOptional()
  @IsNumber()
  candle_harami_bullish?: number;

  @IsOptional()
  @IsNumber()
  candle_harami_bearish?: number;

  @IsOptional()
  @IsNumber()
  candle_kicking_bullish?: number;

  @IsOptional()
  @IsNumber()
  candle_kicking_bearish?: number;

  @IsOptional()
  @IsNumber()
  candle_longshadow_lower?: number;

  @IsOptional()
  @IsNumber()
  candle_longshadow_upper?: number;

  @IsOptional()
  @IsNumber()
  candle_hammer?: number;

  @IsOptional()
  @IsNumber()
  candle_invertedhammer?: number;

  @IsOptional()
  @IsNumber()
  candle_marubozu_white?: number;

  @IsOptional()
  @IsNumber()
  candle_marubozu_black?: number;

  @IsOptional()
  @IsNumber()
  candle_spinningtop_black?: number;

  @IsOptional()
  @IsNumber()
  candle_spinningtop_white?: number;

  @IsOptional()
  @IsNumber()
  candle_3blackcrows?: number;

  @IsOptional()
  @IsNumber()
  candle_tristar_bullish?: number;

  @IsOptional()
  @IsNumber()
  candle_tristar_bearish?: number;

  @IsOptional()
  @IsNumber()
  candle_3whitesoldiers?: number;

  @IsOptional()
  @IsNumber()
  rec_wr?: number;

  @IsOptional()
  @IsNumber()
  rec_uo?: number;
}
