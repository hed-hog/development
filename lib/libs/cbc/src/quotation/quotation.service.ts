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
      'monthly_performance',
      'weekly_performance',
      'negative_directional_indicator_14',
      'positive_directional_indicator_14',
      'average_directional_index_14',
      'exponential_moving_average_200',
      'simple_moving_average_10',
      'simple_moving_average_20',
      'simple_moving_average_30',
      'simple_moving_average_50',
      'simple_moving_average_100',
      'simple_moving_average_200',
      'price',
      'volatility',
      'opening',
      'all_time_high',
      'aroon_up_14',
      'aroon_down_14',
      'all_time_low',
      'bollinger_lower_band_20',
      'bollinger_upper_band_20',
      'donchian_channels_lower_band_20',
      'donchian_channels_upper_band_20',
      'bull_bear_power',
      'keltner_channels_lower_band_20',
      'keltner_channels_upper_band_20',
      'market_cap',
      'buy',
      'year_to_date_performance',
      'annual_performance',
      'six_month_performance',
      'three_month_performance',
      'stochastic_d',
      'stochastic_k',
      'gap_percent',
      'ichimoku_leading_span_a',
      'ichimoku_leading_span_b',
      'slow_stochastic_rsi',
      'fast_stochastic_rsi',
      'commodity_channel_index_20',
      'relative_strength_index_7',
      'relative_strength_index_14',
      'ichimoku_base_line',
      'ichimoku_conversion_line',
      'one_month_high',
      'fifty_two_week_high',
      'six_month_high',
      'three_month_high',
      'average_true_range_14',
      'average_daily_range_14',
      'hull_moving_average_9',
      'exponential_moving_average_5',
      'exponential_moving_average_10',
      'exponential_moving_average_20',
      'exponential_moving_average_30',
      'exponential_moving_average_50',
      'exponential_moving_average_100',
      'volume_weighted_moving_average_20',
      'simple_moving_average_5',
      'one_month_low',
      'fifty_two_week_low',
      'six_month_low',
      'three_month_low',
      'available_currencies',
      'momentum_10',
      'macd_level_12_26',
      'awesome_oscillator',
      'standard',
      'five_year_performance',
      'all_time_performance',
      'camarilla_pivot_p',
      'camarilla_pivot_r1',
      'camarilla_pivot_r2',
      'camarilla_pivot_r3',
      'camarilla_pivot_s1',
      'camarilla_pivot_s2',
      'camarilla_pivot_s3',
      'classic_pivot_p',
      'classic_pivot_r1',
      'classic_pivot_r2',
      'classic_pivot_r3',
      'classic_pivot_s1',
      'classic_pivot_s2',
      'classic_pivot_s3',
      'dm_pivot_p',
      'dm_pivot_r1',
      'dm_pivot_s1',
      'fibonacci_pivot_p',
      'fibonacci_pivot_r1',
      'fibonacci_pivot_r2',
      'fibonacci_pivot_r3',
      'fibonacci_pivot_s1',
      'fibonacci_pivot_s2',
      'fibonacci_pivot_s3',
      'woodie_pivot_p',
      'woodie_pivot_r1',
      'woodie_pivot_r2',
      'woodie_pivot_r3',
      'woodie_pivot_s1',
      'woodie_pivot_s2',
      'woodie_pivot_s3',
      'volume_weighted_average_price',
      'williams_percent_range_14',
      'parabolic_sar',
      'macd_signal_12_26',
      'rate_of_change_9',
      'total_units_currencies',
      'ultimate_oscillator',
      'diluted_market_value',
      'percentage_change',
      'change',
      'change_1h_percent',
      'change_1h',
      'change_1minute_percent',
      'change_1minute',
      'change_1month_percent',
      'change_1month',
      'change_1week_percent',
      'change_1week',
      'change_4hour_percent',
      'change_4hour',
      'change_5minute_percent',
      'change_5minute',
      'change_15minute_percent',
      'change_15minute',
      'percentage_change_from_open',
      'change_from_open',
      'percentage_change_in_24h_volume',
      'sell',
      'monthly_volatility',
      'weekly_volatility',
      'volume',
      'volume_24h_usd',
      'average_volume_10_days',
      'average_volume_30_days',
      'average_volume_60_days',
      'average_volume_90_days',
      'traded_volume',
      'relative_volume',
      'time_relative_volume',
      'maximum',
      'minimum'
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
