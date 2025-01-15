import { PaginationDTO, PaginationService } from '@hedhog/pagination';
import { PrismaService } from '@hedhog/prisma';
import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef
} from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { DeleteDTO } from '@hedhog/core';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class QuotationService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService))
    private readonly paginationService: PaginationService
  ) {}

  async list(paginationParams: PaginationDTO) {
    const fields = [
      'open',
      'high_all',
      'aroon_up',
      'aroon_down',
      'low_all',
      'bb_lower',
      'bb_upper',
      'donchch20_lower',
      'donchch20_upper',
      'bbpower',
      'kltchnl_lower',
      'kltchnl_upper',
      'market_cap_calc',
      'recommend_ma',
      'recommend_other',
      'bid',
      'perf_ytd',
      'perf_y',
      'perf_6m',
      'perf_3m',
      'perf_1m',
      'perf_w',
      'stoch_d',
      'stoch_k',
      'gap',
      'ichimoku_lead1',
      'ichimoku_lead2',
      'stoch_rsi_d',
      'stoch_rsi_k',
      'adx_minus_di',
      'adx_plus_di',
      'cci20',
      'rsi7',
      'rsi',
      'adx',
      'ichimoku_bline',
      'ichimoku_cline',
      'high_1m',
      'price_52_week_high',
      'high_6m',
      'high_3m',
      'atr',
      'adr',
      'hullma9',
      'ema5',
      'ema10',
      'ema20',
      'ema30',
      'ema50',
      'ema100',
      'ema200',
      'vwma',
      'sma5',
      'sma10',
      'sma20',
      'sma30',
      'sma50',
      'sma100',
      'sma200',
      'low_1m',
      'price_52_week_low',
      'low_6m',
      'low_3m',
      'total_shares_outstanding',
      'mom',
      'macd_macd',
      'ao',
      'perf_5y',
      'perf_all',
      'pivot_m_camarilla_middle',
      'pivot_m_camarilla_r1',
      'pivot_m_camarilla_r2',
      'pivot_m_camarilla_r3',
      'pivot_m_camarilla_s1',
      'pivot_m_camarilla_s2',
      'pivot_m_camarilla_s3',
      'pivot_m_classic_middle',
      'pivot_m_classic_r1',
      'pivot_m_classic_r2',
      'pivot_m_classic_r3',
      'pivot_m_classic_s1',
      'pivot_m_classic_s2',
      'pivot_m_classic_s3',
      'pivot_m_demark_middle',
      'pivot_m_demark_r1',
      'pivot_m_demark_s1',
      'pivot_m_fibonacci_middle',
      'pivot_m_fibonacci_r1',
      'pivot_m_fibonacci_r2',
      'pivot_m_fibonacci_r3',
      'pivot_m_fibonacci_s1',
      'pivot_m_fibonacci_s2',
      'pivot_m_fibonacci_s3',
      'pivot_m_woodie_middle',
      'pivot_m_woodie_r1',
      'pivot_m_woodie_r2',
      'pivot_m_woodie_r3',
      'pivot_m_woodie_s1',
      'pivot_m_woodie_s2',
      'pivot_m_woodie_s3',
      'relative_volume_intraday_5',
      'close',
      'vwap',
      'w_r',
      'p_sar',
      'macd_signal',
      'roc',
      'recommend_all',
      'total_shares_diluted',
      'uo',
      'market_cap_diluted_calc',
      'change',
      'change_abs',
      'change_from_open',
      'change_from_open_abs',
      'ask',
      'volatility_d',
      'volatility_m',
      'volatility_w',
      'volume',
      'average_volume_10d_calc',
      'average_volume_30d_calc',
      'average_volume_60d_calc',
      'average_volume_90d_calc',
      'total_value_traded',
      'relative_volume_10d_calc',
      'high',
      'low',
      'description',
      'type',
      'subtype',
      'update_mode',
      'pricescale',
      'minmov',
      'fractional',
      'minmove2',
      'rec_bbpower',
      'stoch_k_1_',
      'stoch_d_1_',
      'rec_stoch_rsi',
      'cci20_1_',
      'rsi7_1_',
      'rsi_1_',
      'adx_plus_di_1_',
      'adx_minus_di_1_',
      'rec_ichimoku',
      'rec_hullma9',
      'rec_vwma',
      'mom_1_',
      'ao_1_',
      'ao_2_',
      'candle_doji',
      'candle_abandonedbaby_bullish',
      'candle_abandonedbaby_bearish',
      'candle_doji_dragonfly',
      'candle_hangingman',
      'candle_engulfing_bullish',
      'candle_engulfing_bearish',
      'candle_shootingstar',
      'candle_morningstar',
      'candle_eveningstar',
      'candle_doji_gravestone',
      'candle_harami_bullish',
      'candle_harami_bearish',
      'candle_kicking_bullish',
      'candle_kicking_bearish',
      'candle_longshadow_lower',
      'candle_longshadow_upper',
      'candle_hammer',
      'candle_invertedhammer',
      'candle_marubozu_white',
      'candle_marubozu_black',
      'candle_spinningtop_black',
      'candle_spinningtop_white',
      'candle_3blackcrows',
      'candle_tristar_bullish',
      'candle_tristar_bearish',
      'candle_3whitesoldiers',
      'rec_wr',
      'rec_uo',
      'change_60',
      'change_15',
      'adx_1'
    ];
    const OR: any[] = this.prismaService.createInsensitiveSearch(
      fields,
      paginationParams
    );

    if (paginationParams.search && !isNaN(+paginationParams.search)) {
      OR.push({ id: { equals: +paginationParams.search } });
    }

    return this.paginationService.paginate(
      this.prismaService.quotation,
      paginationParams,
      {
        where: {
          OR
        }
      }
    );
  }

  async get(id: number) {
    return this.prismaService.quotation.findUnique({
      where: { id: id }
    });
  }

  async create(data: CreateDTO) {
    return this.prismaService.quotation.create({
      data
    });
  }

  async update({ id, data }: { id: number; data: UpdateDTO }) {
    return this.prismaService.quotation.update({
      where: { id: id },
      data
    });
  }

  async delete({ ids }: DeleteDTO) {
    if (ids == undefined || ids == null) {
      throw new BadRequestException(
        'You must select at least one item to delete.'
      );
    }

    return this.prismaService.quotation.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }
}
