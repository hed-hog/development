import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useQuotationDelete } from '@/features/cbc/quotation';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { Quotation } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QuotationCreatePanel from './components/quotation-create-panel';
import QuotationUpdatePanel from './components/quotation-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Quotation[]>([]);
  const { mutate: deleteQuotation } = useQuotationDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'cbc.quotation',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'cbc.quotation' }),
      description: t('createText', { ns: 'cbc.quotation' }),
      children: () => <QuotationCreatePanel onCreated={() => closeSheet(id)} />
    });

    return id;
  };

  const openDelete = (items: Quotation[]) => {
    return confirm({
      title: `${t('delete', { ns: 'cbc.quotation' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'cbc.quotation' })
    })
      .then(() =>
        deleteQuotation(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Quotation) => {
    const id = openSheet({
      children: () => (
        <QuotationUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'cbc.quotation' }),
      description: t('editText', { ns: 'cbc.quotation' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('quotation', { ns: 'modules' })} />
      <DataPanel
        url="/quotation"
        layout="table"
        id="quotation"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'monthly_performance',
            header: t('quotation.monthly_performance', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'weekly_performance',
            header: t('quotation.weekly_performance', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'negative_directional_indicator_14',
            header: t('quotation.negative_directional_indicator_14', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'positive_directional_indicator_14',
            header: t('quotation.positive_directional_indicator_14', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'average_directional_index_14',
            header: t('quotation.average_directional_index_14', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'exponential_moving_average_200',
            header: t('quotation.exponential_moving_average_200', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'simple_moving_average_10',
            header: t('quotation.simple_moving_average_10', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'simple_moving_average_20',
            header: t('quotation.simple_moving_average_20', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'simple_moving_average_30',
            header: t('quotation.simple_moving_average_30', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'simple_moving_average_50',
            header: t('quotation.simple_moving_average_50', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'simple_moving_average_100',
            header: t('quotation.simple_moving_average_100', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'simple_moving_average_200',
            header: t('quotation.simple_moving_average_200', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'price',
            header: t('quotation.price', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'volatility',
            header: t('quotation.volatility', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'opening',
            header: t('quotation.opening', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'all_time_high',
            header: t('quotation.all_time_high', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'aroon_up_14',
            header: t('quotation.aroon_up_14', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'aroon_down_14',
            header: t('quotation.aroon_down_14', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'all_time_low',
            header: t('quotation.all_time_low', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'bollinger_lower_band_20',
            header: t('quotation.bollinger_lower_band_20', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'bollinger_upper_band_20',
            header: t('quotation.bollinger_upper_band_20', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'donchian_channels_lower_band_20',
            header: t('quotation.donchian_channels_lower_band_20', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'donchian_channels_upper_band_20',
            header: t('quotation.donchian_channels_upper_band_20', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'bull_bear_power',
            header: t('quotation.bull_bear_power', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'keltner_channels_lower_band_20',
            header: t('quotation.keltner_channels_lower_band_20', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'keltner_channels_upper_band_20',
            header: t('quotation.keltner_channels_upper_band_20', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'market_cap',
            header: t('quotation.market_cap', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'buy',
            header: t('quotation.buy', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'year_to_date_performance',
            header: t('quotation.year_to_date_performance', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'annual_performance',
            header: t('quotation.annual_performance', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'six_month_performance',
            header: t('quotation.six_month_performance', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'three_month_performance',
            header: t('quotation.three_month_performance', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'stochastic_d',
            header: t('quotation.stochastic_d', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'stochastic_k',
            header: t('quotation.stochastic_k', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'gap_percent',
            header: t('quotation.gap_percent', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ichimoku_leading_span_a',
            header: t('quotation.ichimoku_leading_span_a', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ichimoku_leading_span_b',
            header: t('quotation.ichimoku_leading_span_b', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'slow_stochastic_rsi',
            header: t('quotation.slow_stochastic_rsi', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'fast_stochastic_rsi',
            header: t('quotation.fast_stochastic_rsi', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'commodity_channel_index_20',
            header: t('quotation.commodity_channel_index_20', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'relative_strength_index_7',
            header: t('quotation.relative_strength_index_7', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'relative_strength_index_14',
            header: t('quotation.relative_strength_index_14', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ichimoku_base_line',
            header: t('quotation.ichimoku_base_line', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ichimoku_conversion_line',
            header: t('quotation.ichimoku_conversion_line', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'one_month_high',
            header: t('quotation.one_month_high', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'fifty_two_week_high',
            header: t('quotation.fifty_two_week_high', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'six_month_high',
            header: t('quotation.six_month_high', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'three_month_high',
            header: t('quotation.three_month_high', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'average_true_range_14',
            header: t('quotation.average_true_range_14', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'average_daily_range_14',
            header: t('quotation.average_daily_range_14', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'hull_moving_average_9',
            header: t('quotation.hull_moving_average_9', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'exponential_moving_average_5',
            header: t('quotation.exponential_moving_average_5', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'exponential_moving_average_10',
            header: t('quotation.exponential_moving_average_10', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'exponential_moving_average_20',
            header: t('quotation.exponential_moving_average_20', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'exponential_moving_average_30',
            header: t('quotation.exponential_moving_average_30', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'exponential_moving_average_50',
            header: t('quotation.exponential_moving_average_50', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'exponential_moving_average_100',
            header: t('quotation.exponential_moving_average_100', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'volume_weighted_moving_average_20',
            header: t('quotation.volume_weighted_moving_average_20', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'simple_moving_average_5',
            header: t('quotation.simple_moving_average_5', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'one_month_low',
            header: t('quotation.one_month_low', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'fifty_two_week_low',
            header: t('quotation.fifty_two_week_low', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'six_month_low',
            header: t('quotation.six_month_low', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'three_month_low',
            header: t('quotation.three_month_low', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'available_currencies',
            header: t('quotation.available_currencies', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'momentum_10',
            header: t('quotation.momentum_10', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'macd_level_12_26',
            header: t('quotation.macd_level_12_26', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'awesome_oscillator',
            header: t('quotation.awesome_oscillator', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'standard',
            header: t('quotation.standard', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'five_year_performance',
            header: t('quotation.five_year_performance', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'all_time_performance',
            header: t('quotation.all_time_performance', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'camarilla_pivot_p',
            header: t('quotation.camarilla_pivot_p', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'camarilla_pivot_r1',
            header: t('quotation.camarilla_pivot_r1', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'camarilla_pivot_r2',
            header: t('quotation.camarilla_pivot_r2', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'camarilla_pivot_r3',
            header: t('quotation.camarilla_pivot_r3', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'camarilla_pivot_s1',
            header: t('quotation.camarilla_pivot_s1', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'camarilla_pivot_s2',
            header: t('quotation.camarilla_pivot_s2', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'camarilla_pivot_s3',
            header: t('quotation.camarilla_pivot_s3', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'classic_pivot_p',
            header: t('quotation.classic_pivot_p', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'classic_pivot_r1',
            header: t('quotation.classic_pivot_r1', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'classic_pivot_r2',
            header: t('quotation.classic_pivot_r2', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'classic_pivot_r3',
            header: t('quotation.classic_pivot_r3', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'classic_pivot_s1',
            header: t('quotation.classic_pivot_s1', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'classic_pivot_s2',
            header: t('quotation.classic_pivot_s2', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'classic_pivot_s3',
            header: t('quotation.classic_pivot_s3', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'dm_pivot_p',
            header: t('quotation.dm_pivot_p', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'dm_pivot_r1',
            header: t('quotation.dm_pivot_r1', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'dm_pivot_s1',
            header: t('quotation.dm_pivot_s1', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'fibonacci_pivot_p',
            header: t('quotation.fibonacci_pivot_p', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'fibonacci_pivot_r1',
            header: t('quotation.fibonacci_pivot_r1', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'fibonacci_pivot_r2',
            header: t('quotation.fibonacci_pivot_r2', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'fibonacci_pivot_r3',
            header: t('quotation.fibonacci_pivot_r3', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'fibonacci_pivot_s1',
            header: t('quotation.fibonacci_pivot_s1', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'fibonacci_pivot_s2',
            header: t('quotation.fibonacci_pivot_s2', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'fibonacci_pivot_s3',
            header: t('quotation.fibonacci_pivot_s3', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'woodie_pivot_p',
            header: t('quotation.woodie_pivot_p', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'woodie_pivot_r1',
            header: t('quotation.woodie_pivot_r1', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'woodie_pivot_r2',
            header: t('quotation.woodie_pivot_r2', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'woodie_pivot_r3',
            header: t('quotation.woodie_pivot_r3', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'woodie_pivot_s1',
            header: t('quotation.woodie_pivot_s1', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'woodie_pivot_s2',
            header: t('quotation.woodie_pivot_s2', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'woodie_pivot_s3',
            header: t('quotation.woodie_pivot_s3', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'volume_weighted_average_price',
            header: t('quotation.volume_weighted_average_price', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'williams_percent_range_14',
            header: t('quotation.williams_percent_range_14', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'parabolic_sar',
            header: t('quotation.parabolic_sar', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'macd_signal_12_26',
            header: t('quotation.macd_signal_12_26', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'rate_of_change_9',
            header: t('quotation.rate_of_change_9', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'total_units_currencies',
            header: t('quotation.total_units_currencies', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ultimate_oscillator',
            header: t('quotation.ultimate_oscillator', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'diluted_market_value',
            header: t('quotation.diluted_market_value', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'percentage_change',
            header: t('quotation.percentage_change', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change',
            header: t('quotation.change', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_1h_percent',
            header: t('quotation.change_1h_percent', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_1h',
            header: t('quotation.change_1h', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_1minute_percent',
            header: t('quotation.change_1minute_percent', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_1minute',
            header: t('quotation.change_1minute', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_1month_percent',
            header: t('quotation.change_1month_percent', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_1month',
            header: t('quotation.change_1month', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_1week_percent',
            header: t('quotation.change_1week_percent', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_1week',
            header: t('quotation.change_1week', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_4hour_percent',
            header: t('quotation.change_4hour_percent', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_4hour',
            header: t('quotation.change_4hour', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_5minute_percent',
            header: t('quotation.change_5minute_percent', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_5minute',
            header: t('quotation.change_5minute', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_15minute_percent',
            header: t('quotation.change_15minute_percent', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_15minute',
            header: t('quotation.change_15minute', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'percentage_change_from_open',
            header: t('quotation.percentage_change_from_open', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'change_from_open',
            header: t('quotation.change_from_open', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'percentage_change_in_24h_volume',
            header: t('quotation.percentage_change_in_24h_volume', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'sell',
            header: t('quotation.sell', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'monthly_volatility',
            header: t('quotation.monthly_volatility', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'weekly_volatility',
            header: t('quotation.weekly_volatility', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'volume',
            header: t('quotation.volume', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'volume_24h_usd',
            header: t('quotation.volume_24h_usd', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'average_volume_10_days',
            header: t('quotation.average_volume_10_days', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'average_volume_30_days',
            header: t('quotation.average_volume_30_days', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'average_volume_60_days',
            header: t('quotation.average_volume_60_days', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'average_volume_90_days',
            header: t('quotation.average_volume_90_days', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'traded_volume',
            header: t('quotation.traded_volume', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'relative_volume',
            header: t('quotation.relative_volume', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'time_relative_volume',
            header: t('quotation.time_relative_volume', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'maximum',
            header: t('quotation.maximum', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'minimum',
            header: t('quotation.minimum', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as Quotation[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'cbc.quotation' }),
            handler: (items: Quotation[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'cbc.quotation' }),
            variant: 'destructive',
            handler: (items: Quotation[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'cbc.quotation' }),
            variant: 'default',
            handler: () => {
              openCreate();
            },
            show: 'none'
          }
        ]}
      />
    </>
  );
}
