import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { useQuotationGet, useQuotationUpdate } from "@/features/cbc/quotation";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Quotation } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type QuotationUpdatePanelProps = {
  data: Quotation;
  onUpdated?: (data: Quotation) => void;
};

const QuotationUpdatePanel = forwardRef(
  ({ data, onUpdated }: QuotationUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useQuotationGet(data.id as number);
    const { mutate: quotationUpdate } = useQuotationUpdate();
    const formRef = useRef<FormPanelRef>(null);

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item);
      }
    }, [item]);

    useImperativeHandle(ref, () => ({}));

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t("details", { ns: "actions" }),
            children: (
              <Overlay loading={isLoading}>
                <FormPanel
                  ref={formRef}
                  fields={[
                    {
                      name: "coin_id",
                      label: { text: t("quotation.coin_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/coin",
                      displayName: "coin",
                      valueName: "id",
                    },

                    {
                      name: "type_id",
                      label: { text: t("quotation.type_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/quotation-type",
                      displayName: "type",
                      valueName: "id",
                    },

                    {
                      name: "monthly_performance",
                      label: {
                        text: t("quotation.monthly_performance", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "weekly_performance",
                      label: {
                        text: t("quotation.weekly_performance", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "negative_directional_indicator_14",
                      label: {
                        text: t("quotation.negative_directional_indicator_14", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "positive_directional_indicator_14",
                      label: {
                        text: t("quotation.positive_directional_indicator_14", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "average_directional_index_14",
                      label: {
                        text: t("quotation.average_directional_index_14", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "exponential_moving_average_200",
                      label: {
                        text: t("quotation.exponential_moving_average_200", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "simple_moving_average_10",
                      label: {
                        text: t("quotation.simple_moving_average_10", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "simple_moving_average_20",
                      label: {
                        text: t("quotation.simple_moving_average_20", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "simple_moving_average_30",
                      label: {
                        text: t("quotation.simple_moving_average_30", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "simple_moving_average_50",
                      label: {
                        text: t("quotation.simple_moving_average_50", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "simple_moving_average_100",
                      label: {
                        text: t("quotation.simple_moving_average_100", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "simple_moving_average_200",
                      label: {
                        text: t("quotation.simple_moving_average_200", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "price",
                      label: { text: t("quotation.price", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "volatility",
                      label: {
                        text: t("quotation.volatility", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "opening",
                      label: { text: t("quotation.opening", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "all_time_high",
                      label: {
                        text: t("quotation.all_time_high", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "aroon_up_14",
                      label: {
                        text: t("quotation.aroon_up_14", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "aroon_down_14",
                      label: {
                        text: t("quotation.aroon_down_14", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "all_time_low",
                      label: {
                        text: t("quotation.all_time_low", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "bollinger_lower_band_20",
                      label: {
                        text: t("quotation.bollinger_lower_band_20", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "bollinger_upper_band_20",
                      label: {
                        text: t("quotation.bollinger_upper_band_20", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "donchian_channels_lower_band_20",
                      label: {
                        text: t("quotation.donchian_channels_lower_band_20", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "donchian_channels_upper_band_20",
                      label: {
                        text: t("quotation.donchian_channels_upper_band_20", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "bull_bear_power",
                      label: {
                        text: t("quotation.bull_bear_power", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "keltner_channels_lower_band_20",
                      label: {
                        text: t("quotation.keltner_channels_lower_band_20", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "keltner_channels_upper_band_20",
                      label: {
                        text: t("quotation.keltner_channels_upper_band_20", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "market_cap",
                      label: {
                        text: t("quotation.market_cap", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "buy",
                      label: { text: t("quotation.buy", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "year_to_date_performance",
                      label: {
                        text: t("quotation.year_to_date_performance", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "annual_performance",
                      label: {
                        text: t("quotation.annual_performance", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "six_month_performance",
                      label: {
                        text: t("quotation.six_month_performance", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "three_month_performance",
                      label: {
                        text: t("quotation.three_month_performance", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "stochastic_d",
                      label: {
                        text: t("quotation.stochastic_d", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "stochastic_k",
                      label: {
                        text: t("quotation.stochastic_k", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "gap_percent",
                      label: {
                        text: t("quotation.gap_percent", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ichimoku_leading_span_a",
                      label: {
                        text: t("quotation.ichimoku_leading_span_a", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ichimoku_leading_span_b",
                      label: {
                        text: t("quotation.ichimoku_leading_span_b", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "slow_stochastic_rsi",
                      label: {
                        text: t("quotation.slow_stochastic_rsi", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "fast_stochastic_rsi",
                      label: {
                        text: t("quotation.fast_stochastic_rsi", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "commodity_channel_index_20",
                      label: {
                        text: t("quotation.commodity_channel_index_20", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "relative_strength_index_7",
                      label: {
                        text: t("quotation.relative_strength_index_7", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "relative_strength_index_14",
                      label: {
                        text: t("quotation.relative_strength_index_14", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ichimoku_base_line",
                      label: {
                        text: t("quotation.ichimoku_base_line", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ichimoku_conversion_line",
                      label: {
                        text: t("quotation.ichimoku_conversion_line", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "one_month_high",
                      label: {
                        text: t("quotation.one_month_high", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "fifty_two_week_high",
                      label: {
                        text: t("quotation.fifty_two_week_high", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "six_month_high",
                      label: {
                        text: t("quotation.six_month_high", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "three_month_high",
                      label: {
                        text: t("quotation.three_month_high", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "average_true_range_14",
                      label: {
                        text: t("quotation.average_true_range_14", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "average_daily_range_14",
                      label: {
                        text: t("quotation.average_daily_range_14", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "hull_moving_average_9",
                      label: {
                        text: t("quotation.hull_moving_average_9", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "exponential_moving_average_5",
                      label: {
                        text: t("quotation.exponential_moving_average_5", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "exponential_moving_average_10",
                      label: {
                        text: t("quotation.exponential_moving_average_10", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "exponential_moving_average_20",
                      label: {
                        text: t("quotation.exponential_moving_average_20", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "exponential_moving_average_30",
                      label: {
                        text: t("quotation.exponential_moving_average_30", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "exponential_moving_average_50",
                      label: {
                        text: t("quotation.exponential_moving_average_50", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "exponential_moving_average_100",
                      label: {
                        text: t("quotation.exponential_moving_average_100", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "volume_weighted_moving_average_20",
                      label: {
                        text: t("quotation.volume_weighted_moving_average_20", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "simple_moving_average_5",
                      label: {
                        text: t("quotation.simple_moving_average_5", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "one_month_low",
                      label: {
                        text: t("quotation.one_month_low", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "fifty_two_week_low",
                      label: {
                        text: t("quotation.fifty_two_week_low", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "six_month_low",
                      label: {
                        text: t("quotation.six_month_low", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "three_month_low",
                      label: {
                        text: t("quotation.three_month_low", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "available_currencies",
                      label: {
                        text: t("quotation.available_currencies", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "momentum_10",
                      label: {
                        text: t("quotation.momentum_10", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "macd_level_12_26",
                      label: {
                        text: t("quotation.macd_level_12_26", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "awesome_oscillator",
                      label: {
                        text: t("quotation.awesome_oscillator", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "standard",
                      label: {
                        text: t("quotation.standard", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "five_year_performance",
                      label: {
                        text: t("quotation.five_year_performance", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "all_time_performance",
                      label: {
                        text: t("quotation.all_time_performance", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "camarilla_pivot_p",
                      label: {
                        text: t("quotation.camarilla_pivot_p", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "camarilla_pivot_r1",
                      label: {
                        text: t("quotation.camarilla_pivot_r1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "camarilla_pivot_r2",
                      label: {
                        text: t("quotation.camarilla_pivot_r2", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "camarilla_pivot_r3",
                      label: {
                        text: t("quotation.camarilla_pivot_r3", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "camarilla_pivot_s1",
                      label: {
                        text: t("quotation.camarilla_pivot_s1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "camarilla_pivot_s2",
                      label: {
                        text: t("quotation.camarilla_pivot_s2", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "camarilla_pivot_s3",
                      label: {
                        text: t("quotation.camarilla_pivot_s3", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "classic_pivot_p",
                      label: {
                        text: t("quotation.classic_pivot_p", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "classic_pivot_r1",
                      label: {
                        text: t("quotation.classic_pivot_r1", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "classic_pivot_r2",
                      label: {
                        text: t("quotation.classic_pivot_r2", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "classic_pivot_r3",
                      label: {
                        text: t("quotation.classic_pivot_r3", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "classic_pivot_s1",
                      label: {
                        text: t("quotation.classic_pivot_s1", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "classic_pivot_s2",
                      label: {
                        text: t("quotation.classic_pivot_s2", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "classic_pivot_s3",
                      label: {
                        text: t("quotation.classic_pivot_s3", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "dm_pivot_p",
                      label: {
                        text: t("quotation.dm_pivot_p", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "dm_pivot_r1",
                      label: {
                        text: t("quotation.dm_pivot_r1", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "dm_pivot_s1",
                      label: {
                        text: t("quotation.dm_pivot_s1", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "fibonacci_pivot_p",
                      label: {
                        text: t("quotation.fibonacci_pivot_p", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "fibonacci_pivot_r1",
                      label: {
                        text: t("quotation.fibonacci_pivot_r1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "fibonacci_pivot_r2",
                      label: {
                        text: t("quotation.fibonacci_pivot_r2", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "fibonacci_pivot_r3",
                      label: {
                        text: t("quotation.fibonacci_pivot_r3", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "fibonacci_pivot_s1",
                      label: {
                        text: t("quotation.fibonacci_pivot_s1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "fibonacci_pivot_s2",
                      label: {
                        text: t("quotation.fibonacci_pivot_s2", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "fibonacci_pivot_s3",
                      label: {
                        text: t("quotation.fibonacci_pivot_s3", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "woodie_pivot_p",
                      label: {
                        text: t("quotation.woodie_pivot_p", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "woodie_pivot_r1",
                      label: {
                        text: t("quotation.woodie_pivot_r1", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "woodie_pivot_r2",
                      label: {
                        text: t("quotation.woodie_pivot_r2", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "woodie_pivot_r3",
                      label: {
                        text: t("quotation.woodie_pivot_r3", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "woodie_pivot_s1",
                      label: {
                        text: t("quotation.woodie_pivot_s1", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "woodie_pivot_s2",
                      label: {
                        text: t("quotation.woodie_pivot_s2", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "woodie_pivot_s3",
                      label: {
                        text: t("quotation.woodie_pivot_s3", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "volume_weighted_average_price",
                      label: {
                        text: t("quotation.volume_weighted_average_price", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "williams_percent_range_14",
                      label: {
                        text: t("quotation.williams_percent_range_14", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "parabolic_sar",
                      label: {
                        text: t("quotation.parabolic_sar", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "macd_signal_12_26",
                      label: {
                        text: t("quotation.macd_signal_12_26", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "rate_of_change_9",
                      label: {
                        text: t("quotation.rate_of_change_9", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "total_units_currencies",
                      label: {
                        text: t("quotation.total_units_currencies", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ultimate_oscillator",
                      label: {
                        text: t("quotation.ultimate_oscillator", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "diluted_market_value",
                      label: {
                        text: t("quotation.diluted_market_value", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "percentage_change",
                      label: {
                        text: t("quotation.percentage_change", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change",
                      label: { text: t("quotation.change", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_1h_percent",
                      label: {
                        text: t("quotation.change_1h_percent", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_1h",
                      label: {
                        text: t("quotation.change_1h", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_1minute_percent",
                      label: {
                        text: t("quotation.change_1minute_percent", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_1minute",
                      label: {
                        text: t("quotation.change_1minute", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_1month_percent",
                      label: {
                        text: t("quotation.change_1month_percent", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_1month",
                      label: {
                        text: t("quotation.change_1month", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_1week_percent",
                      label: {
                        text: t("quotation.change_1week_percent", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_1week",
                      label: {
                        text: t("quotation.change_1week", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_4hour_percent",
                      label: {
                        text: t("quotation.change_4hour_percent", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_4hour",
                      label: {
                        text: t("quotation.change_4hour", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_5minute_percent",
                      label: {
                        text: t("quotation.change_5minute_percent", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_5minute",
                      label: {
                        text: t("quotation.change_5minute", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_15minute_percent",
                      label: {
                        text: t("quotation.change_15minute_percent", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_15minute",
                      label: {
                        text: t("quotation.change_15minute", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "percentage_change_from_open",
                      label: {
                        text: t("quotation.percentage_change_from_open", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "change_from_open",
                      label: {
                        text: t("quotation.change_from_open", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "percentage_change_in_24h_volume",
                      label: {
                        text: t("quotation.percentage_change_in_24h_volume", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "sell",
                      label: { text: t("quotation.sell", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "monthly_volatility",
                      label: {
                        text: t("quotation.monthly_volatility", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "weekly_volatility",
                      label: {
                        text: t("quotation.weekly_volatility", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "volume",
                      label: { text: t("quotation.volume", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "volume_24h_usd",
                      label: {
                        text: t("quotation.volume_24h_usd", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "average_volume_10_days",
                      label: {
                        text: t("quotation.average_volume_10_days", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "average_volume_30_days",
                      label: {
                        text: t("quotation.average_volume_30_days", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "average_volume_60_days",
                      label: {
                        text: t("quotation.average_volume_60_days", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "average_volume_90_days",
                      label: {
                        text: t("quotation.average_volume_90_days", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "traded_volume",
                      label: {
                        text: t("quotation.traded_volume", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "relative_volume",
                      label: {
                        text: t("quotation.relative_volume", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "time_relative_volume",
                      label: {
                        text: t("quotation.time_relative_volume", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "maximum",
                      label: { text: t("quotation.maximum", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "minimum",
                      label: { text: t("quotation.minimum", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "moving_averages_rating_id",
                      label: {
                        text: t("quotation.moving_averages_rating_id", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/trend-type",
                      displayName: "moving_averages_rating",
                      valueName: "id",
                    },

                    {
                      name: "oscillators_rating_id",
                      label: {
                        text: t("quotation.oscillators_rating_id", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/trend-type",
                      displayName: "oscillators_rating",
                      valueName: "id",
                    },

                    {
                      name: "technical_rating_id",
                      label: {
                        text: t("quotation.technical_rating_id", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/trend-type",
                      displayName: "technical_rating",
                      valueName: "id",
                    },

                    {
                      name: "stock_exchange_id",
                      label: {
                        text: t("quotation.stock_exchange_id", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/stock-exchange",
                      displayName: "stock_exchange",
                      valueName: "id",
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    quotationUpdate({
                      id: data.id,
                      data,
                    });
                    if (typeof onUpdated === "function") {
                      onUpdated(data);
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
    );
  },
);

QuotationUpdatePanel.displayName = "QuotationUpdatePanel";

export default QuotationUpdatePanel;
