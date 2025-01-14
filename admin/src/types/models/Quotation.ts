import { QuotationRequestType } from './QuotationRequestType';
import { Coin } from './Coin';
import { Bot } from './Bot';
import { StockExchange } from './StockExchange';

export type Quotation = {
  id?: number;
  type_id: number;
  coin_id: number;
  bot_id: number;
  open?: any;
  high_all?: any;
  aroon_up?: any;
  aroon_down?: any;
  low_all?: any;
  bb_lower?: any;
  bb_upper?: any;
  donchch20_lower?: any;
  donchch20_upper?: any;
  stock_exchange_id: number;
  bbpower?: any;
  kltchnl_lower?: any;
  kltchnl_upper?: any;
  market_cap_calc?: any;
  recommend_ma?: any;
  recommend_other?: any;
  bid?: any;
  perf_ytd?: any;
  perf_y?: any;
  perf_6m?: any;
  perf_3m?: any;
  perf_1m?: any;
  perf_w?: any;
  stoch_d?: any;
  stoch_k?: any;
  gap?: any;
  ichimoku_lead1?: any;
  ichimoku_lead2?: any;
  stoch_rsi_d?: any;
  stoch_rsi_k?: any;
  adx_minus_di?: any;
  adx_plus_di?: any;
  cci20?: any;
  rsi7?: any;
  rsi?: any;
  adx?: any;
  ichimoku_bline?: any;
  ichimoku_cline?: any;
  high_1m?: any;
  price_52_week_high?: any;
  high_6m?: any;
  high_3m?: any;
  atr?: any;
  adr?: any;
  hullma9?: any;
  ema5?: any;
  ema10?: any;
  ema20?: any;
  ema30?: any;
  ema50?: any;
  ema100?: any;
  ema200?: any;
  vwma?: any;
  sma5?: any;
  sma10?: any;
  sma20?: any;
  sma30?: any;
  sma50?: any;
  sma100?: any;
  sma200?: any;
  low_1m?: any;
  price_52_week_low?: any;
  low_6m?: any;
  low_3m?: any;
  total_shares_outstanding?: any;
  mom?: any;
  macd_macd?: any;
  ao?: any;
  perf_5y?: any;
  perf_all?: any;
  pivot_m_camarilla_middle?: any;
  pivot_m_camarilla_r1?: any;
  pivot_m_camarilla_r2?: any;
  pivot_m_camarilla_r3?: any;
  pivot_m_camarilla_s1?: any;
  pivot_m_camarilla_s2?: any;
  pivot_m_camarilla_s3?: any;
  pivot_m_classic_middle?: any;
  pivot_m_classic_r1?: any;
  pivot_m_classic_r2?: any;
  pivot_m_classic_r3?: any;
  pivot_m_classic_s1?: any;
  pivot_m_classic_s2?: any;
  pivot_m_classic_s3?: any;
  pivot_m_demark_middle?: any;
  pivot_m_demark_r1?: any;
  pivot_m_demark_s1?: any;
  pivot_m_fibonacci_middle?: any;
  pivot_m_fibonacci_r1?: any;
  pivot_m_fibonacci_r2?: any;
  pivot_m_fibonacci_r3?: any;
  pivot_m_fibonacci_s1?: any;
  pivot_m_fibonacci_s2?: any;
  pivot_m_fibonacci_s3?: any;
  pivot_m_woodie_middle?: any;
  pivot_m_woodie_r1?: any;
  pivot_m_woodie_r2?: any;
  pivot_m_woodie_r3?: any;
  pivot_m_woodie_s1?: any;
  pivot_m_woodie_s2?: any;
  pivot_m_woodie_s3?: any;
  relative_volume_intraday_5?: any;
  close?: any;
  vwap?: any;
  w_r?: any;
  p_sar?: any;
  macd_signal?: any;
  roc?: any;
  recommend_all?: any;
  total_shares_diluted?: any;
  uo?: any;
  market_cap_diluted_calc?: any;
  change?: any;
  change_abs?: any;
  change_from_open?: any;
  change_from_open_abs?: any;
  ask?: any;
  volatility_d?: any;
  volatility_m?: any;
  volatility_w?: any;
  volume?: any;
  average_volume_10d_calc?: any;
  average_volume_30d_calc?: any;
  average_volume_60d_calc?: any;
  average_volume_90d_calc?: any;
  total_value_traded?: any;
  relative_volume_10d_calc?: any;
  high?: any;
  low?: any;
  description?: string;
  type?: string;
  subtype?: string;
  update_mode?: string;
  pricescale?: any;
  minmov?: any;
  fractional?: string;
  minmove2?: any;
  rec_bbpower?: any;
  stoch_k_1_?: any;
  stoch_d_1_?: any;
  rec_stoch_rsi?: any;
  cci20_1_?: any;
  rsi7_1_?: any;
  rsi_1_?: any;
  adx_plus_di_1_?: any;
  adx_minus_di_1_?: any;
  rec_ichimoku?: any;
  rec_hullma9?: any;
  rec_vwma?: any;
  mom_1_?: any;
  ao_1_?: any;
  ao_2_?: any;
  candle_doji?: any;
  candle_abandonedbaby_bullish?: any;
  candle_abandonedbaby_bearish?: any;
  candle_doji_dragonfly?: any;
  candle_hangingman?: any;
  candle_engulfing_bullish?: any;
  candle_engulfing_bearish?: any;
  candle_shootingstar?: any;
  candle_morningstar?: any;
  candle_eveningstar?: any;
  candle_doji_gravestone?: any;
  candle_harami_bullish?: any;
  candle_harami_bearish?: any;
  candle_kicking_bullish?: any;
  candle_kicking_bearish?: any;
  candle_longshadow_lower?: any;
  candle_longshadow_upper?: any;
  candle_hammer?: any;
  candle_invertedhammer?: any;
  candle_marubozu_white?: any;
  candle_marubozu_black?: any;
  candle_spinningtop_black?: any;
  candle_spinningtop_white?: any;
  candle_3blackcrows?: any;
  candle_tristar_bullish?: any;
  candle_tristar_bearish?: any;
  candle_3whitesoldiers?: any;
  rec_wr?: any;
  rec_uo?: any;
  created_at?: string;
  updated_at?: string;
  quotation_request_type?: QuotationRequestType;
  coin?: Coin;
  bot?: Bot;
  stock_exchange?: StockExchange;
}