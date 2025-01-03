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
            key: 'open',
            header: t('quotation.open', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'high_all',
            header: t('quotation.high_all', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'aroon_up',
            header: t('quotation.aroon_up', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'aroon_down',
            header: t('quotation.aroon_down', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'low_all',
            header: t('quotation.low_all', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'bb_lower',
            header: t('quotation.bb_lower', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'bb_upper',
            header: t('quotation.bb_upper', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'donchch20_lower',
            header: t('quotation.donchch20_lower', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'donchch20_upper',
            header: t('quotation.donchch20_upper', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'bbpower',
            header: t('quotation.bbpower', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'kltchnl_lower',
            header: t('quotation.kltchnl_lower', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'kltchnl_upper',
            header: t('quotation.kltchnl_upper', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'market_cap_calc',
            header: t('quotation.market_cap_calc', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'recommend_ma',
            header: t('quotation.recommend_ma', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'recommend_other',
            header: t('quotation.recommend_other', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'bid',
            header: t('quotation.bid', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'perf_ytd',
            header: t('quotation.perf_ytd', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'perf_y',
            header: t('quotation.perf_y', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'perf_6m',
            header: t('quotation.perf_6m', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'perf_3m',
            header: t('quotation.perf_3m', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'perf_1m',
            header: t('quotation.perf_1m', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'perf_w',
            header: t('quotation.perf_w', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'stoch_d',
            header: t('quotation.stoch_d', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'stoch_k',
            header: t('quotation.stoch_k', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'gap',
            header: t('quotation.gap', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ichimoku_lead1',
            header: t('quotation.ichimoku_lead1', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ichimoku_lead2',
            header: t('quotation.ichimoku_lead2', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'stoch_rsi_d',
            header: t('quotation.stoch_rsi_d', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'stoch_rsi_k',
            header: t('quotation.stoch_rsi_k', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'adx_minus_di',
            header: t('quotation.adx_minus_di', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'adx_plus_di',
            header: t('quotation.adx_plus_di', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'cci20',
            header: t('quotation.cci20', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'rsi7',
            header: t('quotation.rsi7', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'rsi',
            header: t('quotation.rsi', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'adx',
            header: t('quotation.adx', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ichimoku_bline',
            header: t('quotation.ichimoku_bline', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ichimoku_cline',
            header: t('quotation.ichimoku_cline', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'high_1m',
            header: t('quotation.high_1m', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'price_52_week_high',
            header: t('quotation.price_52_week_high', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'high_6m',
            header: t('quotation.high_6m', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'high_3m',
            header: t('quotation.high_3m', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'atr',
            header: t('quotation.atr', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'adr',
            header: t('quotation.adr', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'hullma9',
            header: t('quotation.hullma9', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ema5',
            header: t('quotation.ema5', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ema10',
            header: t('quotation.ema10', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ema20',
            header: t('quotation.ema20', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ema30',
            header: t('quotation.ema30', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ema50',
            header: t('quotation.ema50', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ema100',
            header: t('quotation.ema100', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ema200',
            header: t('quotation.ema200', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'vwma',
            header: t('quotation.vwma', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'sma5',
            header: t('quotation.sma5', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'sma10',
            header: t('quotation.sma10', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'sma20',
            header: t('quotation.sma20', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'sma30',
            header: t('quotation.sma30', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'sma50',
            header: t('quotation.sma50', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'sma100',
            header: t('quotation.sma100', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'sma200',
            header: t('quotation.sma200', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'low_1m',
            header: t('quotation.low_1m', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'price_52_week_low',
            header: t('quotation.price_52_week_low', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'low_6m',
            header: t('quotation.low_6m', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'low_3m',
            header: t('quotation.low_3m', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'total_shares_outstanding',
            header: t('quotation.total_shares_outstanding', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'mom',
            header: t('quotation.mom', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'macd_macd',
            header: t('quotation.macd_macd', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ao',
            header: t('quotation.ao', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'perf_5y',
            header: t('quotation.perf_5y', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'perf_all',
            header: t('quotation.perf_all', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'close',
            header: t('quotation.close', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'vwap',
            header: t('quotation.vwap', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'w_r',
            header: t('quotation.w_r', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'p_sar',
            header: t('quotation.p_sar', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'macd_signal',
            header: t('quotation.macd_signal', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'roc',
            header: t('quotation.roc', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'recommend_all',
            header: t('quotation.recommend_all', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'total_shares_diluted',
            header: t('quotation.total_shares_diluted', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'uo',
            header: t('quotation.uo', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'market_cap_diluted_calc',
            header: t('quotation.market_cap_diluted_calc', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change',
            header: t('quotation.change', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_abs',
            header: t('quotation.change_abs', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_from_open',
            header: t('quotation.change_from_open', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'change_from_open_abs',
            header: t('quotation.change_from_open_abs', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ask',
            header: t('quotation.ask', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'volatility_d',
            header: t('quotation.volatility_d', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'volatility_m',
            header: t('quotation.volatility_m', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'volatility_w',
            header: t('quotation.volatility_w', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'volume',
            header: t('quotation.volume', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'average_volume_10d_calc',
            header: t('quotation.average_volume_10d_calc', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'average_volume_30d_calc',
            header: t('quotation.average_volume_30d_calc', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'average_volume_60d_calc',
            header: t('quotation.average_volume_60d_calc', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'average_volume_90d_calc',
            header: t('quotation.average_volume_90d_calc', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'total_value_traded',
            header: t('quotation.total_value_traded', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'relative_volume_10d_calc',
            header: t('quotation.relative_volume_10d_calc', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'high',
            header: t('quotation.high', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'low',
            header: t('quotation.low', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'description',
            header: t('quotation.description', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'type',
            header: t('quotation.type', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'subtype',
            header: t('quotation.subtype', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'update_mode',
            header: t('quotation.update_mode', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'pricescale',
            header: t('quotation.pricescale', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'minmov',
            header: t('quotation.minmov', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'fractional',
            header: t('quotation.fractional', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'minmove2',
            header: t('quotation.minmove2', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'rec_bbpower',
            header: t('quotation.rec_bbpower', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'stoch_k_1_',
            header: t('quotation.stoch_k_1_', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'stoch_d_1_',
            header: t('quotation.stoch_d_1_', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'rec_stoch_rsi',
            header: t('quotation.rec_stoch_rsi', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'cci20_1_',
            header: t('quotation.cci20_1_', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'rsi7_1_',
            header: t('quotation.rsi7_1_', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'rsi_1_',
            header: t('quotation.rsi_1_', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'adx_plus_di_1_',
            header: t('quotation.adx_plus_di_1_', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'adx_minus_di_1_',
            header: t('quotation.adx_minus_di_1_', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'rec_ichimoku',
            header: t('quotation.rec_ichimoku', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'rec_hullma9',
            header: t('quotation.rec_hullma9', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'rec_vwma',
            header: t('quotation.rec_vwma', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'mom_1_',
            header: t('quotation.mom_1_', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ao_1_',
            header: t('quotation.ao_1_', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'ao_2_',
            header: t('quotation.ao_2_', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_doji',
            header: t('quotation.candle_doji', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_abandonedbaby_bullish',
            header: t('quotation.candle_abandonedbaby_bullish', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'candle_abandonedbaby_bearish',
            header: t('quotation.candle_abandonedbaby_bearish', {
              ns: 'fields'
            }),
            isLocale: false
          },

          {
            key: 'candle_doji_dragonfly',
            header: t('quotation.candle_doji_dragonfly', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_hangingman',
            header: t('quotation.candle_hangingman', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_engulfing_bullish',
            header: t('quotation.candle_engulfing_bullish', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_engulfing_bearish',
            header: t('quotation.candle_engulfing_bearish', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_shootingstar',
            header: t('quotation.candle_shootingstar', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_morningstar',
            header: t('quotation.candle_morningstar', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_eveningstar',
            header: t('quotation.candle_eveningstar', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_doji_gravestone',
            header: t('quotation.candle_doji_gravestone', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_harami_bullish',
            header: t('quotation.candle_harami_bullish', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_harami_bearish',
            header: t('quotation.candle_harami_bearish', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_kicking_bullish',
            header: t('quotation.candle_kicking_bullish', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_kicking_bearish',
            header: t('quotation.candle_kicking_bearish', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_longshadow_lower',
            header: t('quotation.candle_longshadow_lower', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_longshadow_upper',
            header: t('quotation.candle_longshadow_upper', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_hammer',
            header: t('quotation.candle_hammer', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_invertedhammer',
            header: t('quotation.candle_invertedhammer', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_marubozu_white',
            header: t('quotation.candle_marubozu_white', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_marubozu_black',
            header: t('quotation.candle_marubozu_black', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_spinningtop_black',
            header: t('quotation.candle_spinningtop_black', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_spinningtop_white',
            header: t('quotation.candle_spinningtop_white', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_3blackcrows',
            header: t('quotation.candle_3blackcrows', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_tristar_bullish',
            header: t('quotation.candle_tristar_bullish', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_tristar_bearish',
            header: t('quotation.candle_tristar_bearish', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'candle_3whitesoldiers',
            header: t('quotation.candle_3whitesoldiers', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'rec_wr',
            header: t('quotation.rec_wr', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'rec_uo',
            header: t('quotation.rec_uo', { ns: 'fields' }),
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
