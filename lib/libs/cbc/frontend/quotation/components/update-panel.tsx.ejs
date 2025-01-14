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
                      name: "type_id",
                      label: { text: t("quotation.type_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/quotation-request-type",
                      displayName: "type",
                      valueName: "id",
                    },

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
                      name: "bot_id",
                      label: { text: t("quotation.bot_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/bot",
                      displayName: "bot",
                      valueName: "id",
                    },

                    {
                      name: "open",
                      label: { text: t("quotation.open", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "high_all",
                      label: {
                        text: t("quotation.high_all", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "aroon_up",
                      label: {
                        text: t("quotation.aroon_up", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "aroon_down",
                      label: {
                        text: t("quotation.aroon_down", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "low_all",
                      label: { text: t("quotation.low_all", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "bb_lower",
                      label: {
                        text: t("quotation.bb_lower", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "bb_upper",
                      label: {
                        text: t("quotation.bb_upper", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "donchch20_lower",
                      label: {
                        text: t("quotation.donchch20_lower", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "donchch20_upper",
                      label: {
                        text: t("quotation.donchch20_upper", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
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

                    {
                      name: "bbpower",
                      label: { text: t("quotation.bbpower", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "kltchnl_lower",
                      label: {
                        text: t("quotation.kltchnl_lower", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "kltchnl_upper",
                      label: {
                        text: t("quotation.kltchnl_upper", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "market_cap_calc",
                      label: {
                        text: t("quotation.market_cap_calc", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "recommend_ma",
                      label: {
                        text: t("quotation.recommend_ma", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "recommend_other",
                      label: {
                        text: t("quotation.recommend_other", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "bid",
                      label: { text: t("quotation.bid", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "perf_ytd",
                      label: {
                        text: t("quotation.perf_ytd", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "perf_y",
                      label: { text: t("quotation.perf_y", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "perf_6m",
                      label: { text: t("quotation.perf_6m", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "perf_3m",
                      label: { text: t("quotation.perf_3m", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "perf_1m",
                      label: { text: t("quotation.perf_1m", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "perf_w",
                      label: { text: t("quotation.perf_w", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "stoch_d",
                      label: { text: t("quotation.stoch_d", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "stoch_k",
                      label: { text: t("quotation.stoch_k", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "gap",
                      label: { text: t("quotation.gap", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ichimoku_lead1",
                      label: {
                        text: t("quotation.ichimoku_lead1", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ichimoku_lead2",
                      label: {
                        text: t("quotation.ichimoku_lead2", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "stoch_rsi_d",
                      label: {
                        text: t("quotation.stoch_rsi_d", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "stoch_rsi_k",
                      label: {
                        text: t("quotation.stoch_rsi_k", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "adx_minus_di",
                      label: {
                        text: t("quotation.adx_minus_di", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "adx_plus_di",
                      label: {
                        text: t("quotation.adx_plus_di", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "cci20",
                      label: { text: t("quotation.cci20", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "rsi7",
                      label: { text: t("quotation.rsi7", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "rsi",
                      label: { text: t("quotation.rsi", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "adx",
                      label: { text: t("quotation.adx", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ichimoku_bline",
                      label: {
                        text: t("quotation.ichimoku_bline", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ichimoku_cline",
                      label: {
                        text: t("quotation.ichimoku_cline", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "high_1m",
                      label: { text: t("quotation.high_1m", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "price_52_week_high",
                      label: {
                        text: t("quotation.price_52_week_high", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "high_6m",
                      label: { text: t("quotation.high_6m", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "high_3m",
                      label: { text: t("quotation.high_3m", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "atr",
                      label: { text: t("quotation.atr", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "adr",
                      label: { text: t("quotation.adr", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "hullma9",
                      label: { text: t("quotation.hullma9", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ema5",
                      label: { text: t("quotation.ema5", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ema10",
                      label: { text: t("quotation.ema10", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ema20",
                      label: { text: t("quotation.ema20", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ema30",
                      label: { text: t("quotation.ema30", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ema50",
                      label: { text: t("quotation.ema50", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ema100",
                      label: { text: t("quotation.ema100", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ema200",
                      label: { text: t("quotation.ema200", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "vwma",
                      label: { text: t("quotation.vwma", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "sma5",
                      label: { text: t("quotation.sma5", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "sma10",
                      label: { text: t("quotation.sma10", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "sma20",
                      label: { text: t("quotation.sma20", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "sma30",
                      label: { text: t("quotation.sma30", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "sma50",
                      label: { text: t("quotation.sma50", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "sma100",
                      label: { text: t("quotation.sma100", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "sma200",
                      label: { text: t("quotation.sma200", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "low_1m",
                      label: { text: t("quotation.low_1m", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "price_52_week_low",
                      label: {
                        text: t("quotation.price_52_week_low", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "low_6m",
                      label: { text: t("quotation.low_6m", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "low_3m",
                      label: { text: t("quotation.low_3m", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "total_shares_outstanding",
                      label: {
                        text: t("quotation.total_shares_outstanding", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "mom",
                      label: { text: t("quotation.mom", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "macd_macd",
                      label: {
                        text: t("quotation.macd_macd", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ao",
                      label: { text: t("quotation.ao", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "perf_5y",
                      label: { text: t("quotation.perf_5y", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "perf_all",
                      label: {
                        text: t("quotation.perf_all", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_camarilla_middle",
                      label: {
                        text: t("quotation.pivot_m_camarilla_middle", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_camarilla_r1",
                      label: {
                        text: t("quotation.pivot_m_camarilla_r1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_camarilla_r2",
                      label: {
                        text: t("quotation.pivot_m_camarilla_r2", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_camarilla_r3",
                      label: {
                        text: t("quotation.pivot_m_camarilla_r3", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_camarilla_s1",
                      label: {
                        text: t("quotation.pivot_m_camarilla_s1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_camarilla_s2",
                      label: {
                        text: t("quotation.pivot_m_camarilla_s2", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_camarilla_s3",
                      label: {
                        text: t("quotation.pivot_m_camarilla_s3", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_classic_middle",
                      label: {
                        text: t("quotation.pivot_m_classic_middle", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_classic_r1",
                      label: {
                        text: t("quotation.pivot_m_classic_r1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_classic_r2",
                      label: {
                        text: t("quotation.pivot_m_classic_r2", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_classic_r3",
                      label: {
                        text: t("quotation.pivot_m_classic_r3", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_classic_s1",
                      label: {
                        text: t("quotation.pivot_m_classic_s1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_classic_s2",
                      label: {
                        text: t("quotation.pivot_m_classic_s2", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_classic_s3",
                      label: {
                        text: t("quotation.pivot_m_classic_s3", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_demark_middle",
                      label: {
                        text: t("quotation.pivot_m_demark_middle", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_demark_r1",
                      label: {
                        text: t("quotation.pivot_m_demark_r1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_demark_s1",
                      label: {
                        text: t("quotation.pivot_m_demark_s1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_fibonacci_middle",
                      label: {
                        text: t("quotation.pivot_m_fibonacci_middle", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_fibonacci_r1",
                      label: {
                        text: t("quotation.pivot_m_fibonacci_r1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_fibonacci_r2",
                      label: {
                        text: t("quotation.pivot_m_fibonacci_r2", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_fibonacci_r3",
                      label: {
                        text: t("quotation.pivot_m_fibonacci_r3", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_fibonacci_s1",
                      label: {
                        text: t("quotation.pivot_m_fibonacci_s1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_fibonacci_s2",
                      label: {
                        text: t("quotation.pivot_m_fibonacci_s2", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_fibonacci_s3",
                      label: {
                        text: t("quotation.pivot_m_fibonacci_s3", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_woodie_middle",
                      label: {
                        text: t("quotation.pivot_m_woodie_middle", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_woodie_r1",
                      label: {
                        text: t("quotation.pivot_m_woodie_r1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_woodie_r2",
                      label: {
                        text: t("quotation.pivot_m_woodie_r2", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_woodie_r3",
                      label: {
                        text: t("quotation.pivot_m_woodie_r3", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_woodie_s1",
                      label: {
                        text: t("quotation.pivot_m_woodie_s1", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_woodie_s2",
                      label: {
                        text: t("quotation.pivot_m_woodie_s2", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pivot_m_woodie_s3",
                      label: {
                        text: t("quotation.pivot_m_woodie_s3", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "relative_volume_intraday_5",
                      label: {
                        text: t("quotation.relative_volume_intraday_5", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "close",
                      label: { text: t("quotation.close", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "vwap",
                      label: { text: t("quotation.vwap", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "w_r",
                      label: { text: t("quotation.w_r", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "p_sar",
                      label: { text: t("quotation.p_sar", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "macd_signal",
                      label: {
                        text: t("quotation.macd_signal", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "roc",
                      label: { text: t("quotation.roc", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "recommend_all",
                      label: {
                        text: t("quotation.recommend_all", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "total_shares_diluted",
                      label: {
                        text: t("quotation.total_shares_diluted", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "uo",
                      label: { text: t("quotation.uo", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "market_cap_diluted_calc",
                      label: {
                        text: t("quotation.market_cap_diluted_calc", {
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
                      name: "change_abs",
                      label: {
                        text: t("quotation.change_abs", { ns: "fields" }),
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
                      name: "change_from_open_abs",
                      label: {
                        text: t("quotation.change_from_open_abs", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ask",
                      label: { text: t("quotation.ask", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "volatility_d",
                      label: {
                        text: t("quotation.volatility_d", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "volatility_m",
                      label: {
                        text: t("quotation.volatility_m", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "volatility_w",
                      label: {
                        text: t("quotation.volatility_w", { ns: "fields" }),
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
                      name: "average_volume_10d_calc",
                      label: {
                        text: t("quotation.average_volume_10d_calc", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "average_volume_30d_calc",
                      label: {
                        text: t("quotation.average_volume_30d_calc", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "average_volume_60d_calc",
                      label: {
                        text: t("quotation.average_volume_60d_calc", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "average_volume_90d_calc",
                      label: {
                        text: t("quotation.average_volume_90d_calc", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "total_value_traded",
                      label: {
                        text: t("quotation.total_value_traded", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "relative_volume_10d_calc",
                      label: {
                        text: t("quotation.relative_volume_10d_calc", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "high",
                      label: { text: t("quotation.high", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "low",
                      label: { text: t("quotation.low", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "description",
                      label: {
                        text: t("quotation.description", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "type",
                      label: { text: t("quotation.type", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "subtype",
                      label: { text: t("quotation.subtype", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "update_mode",
                      label: {
                        text: t("quotation.update_mode", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "pricescale",
                      label: {
                        text: t("quotation.pricescale", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "minmov",
                      label: { text: t("quotation.minmov", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "fractional",
                      label: {
                        text: t("quotation.fractional", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "minmove2",
                      label: {
                        text: t("quotation.minmove2", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "rec_bbpower",
                      label: {
                        text: t("quotation.rec_bbpower", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "stoch_k_1_",
                      label: {
                        text: t("quotation.stoch_k_1_", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "stoch_d_1_",
                      label: {
                        text: t("quotation.stoch_d_1_", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "rec_stoch_rsi",
                      label: {
                        text: t("quotation.rec_stoch_rsi", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "cci20_1_",
                      label: {
                        text: t("quotation.cci20_1_", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "rsi7_1_",
                      label: { text: t("quotation.rsi7_1_", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "rsi_1_",
                      label: { text: t("quotation.rsi_1_", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "adx_plus_di_1_",
                      label: {
                        text: t("quotation.adx_plus_di_1_", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "adx_minus_di_1_",
                      label: {
                        text: t("quotation.adx_minus_di_1_", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "rec_ichimoku",
                      label: {
                        text: t("quotation.rec_ichimoku", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "rec_hullma9",
                      label: {
                        text: t("quotation.rec_hullma9", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "rec_vwma",
                      label: {
                        text: t("quotation.rec_vwma", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "mom_1_",
                      label: { text: t("quotation.mom_1_", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ao_1_",
                      label: { text: t("quotation.ao_1_", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "ao_2_",
                      label: { text: t("quotation.ao_2_", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_doji",
                      label: {
                        text: t("quotation.candle_doji", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_abandonedbaby_bullish",
                      label: {
                        text: t("quotation.candle_abandonedbaby_bullish", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_abandonedbaby_bearish",
                      label: {
                        text: t("quotation.candle_abandonedbaby_bearish", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_doji_dragonfly",
                      label: {
                        text: t("quotation.candle_doji_dragonfly", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_hangingman",
                      label: {
                        text: t("quotation.candle_hangingman", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_engulfing_bullish",
                      label: {
                        text: t("quotation.candle_engulfing_bullish", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_engulfing_bearish",
                      label: {
                        text: t("quotation.candle_engulfing_bearish", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_shootingstar",
                      label: {
                        text: t("quotation.candle_shootingstar", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_morningstar",
                      label: {
                        text: t("quotation.candle_morningstar", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_eveningstar",
                      label: {
                        text: t("quotation.candle_eveningstar", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_doji_gravestone",
                      label: {
                        text: t("quotation.candle_doji_gravestone", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_harami_bullish",
                      label: {
                        text: t("quotation.candle_harami_bullish", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_harami_bearish",
                      label: {
                        text: t("quotation.candle_harami_bearish", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_kicking_bullish",
                      label: {
                        text: t("quotation.candle_kicking_bullish", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_kicking_bearish",
                      label: {
                        text: t("quotation.candle_kicking_bearish", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_longshadow_lower",
                      label: {
                        text: t("quotation.candle_longshadow_lower", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_longshadow_upper",
                      label: {
                        text: t("quotation.candle_longshadow_upper", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_hammer",
                      label: {
                        text: t("quotation.candle_hammer", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_invertedhammer",
                      label: {
                        text: t("quotation.candle_invertedhammer", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_marubozu_white",
                      label: {
                        text: t("quotation.candle_marubozu_white", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_marubozu_black",
                      label: {
                        text: t("quotation.candle_marubozu_black", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_spinningtop_black",
                      label: {
                        text: t("quotation.candle_spinningtop_black", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_spinningtop_white",
                      label: {
                        text: t("quotation.candle_spinningtop_white", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_3blackcrows",
                      label: {
                        text: t("quotation.candle_3blackcrows", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_tristar_bullish",
                      label: {
                        text: t("quotation.candle_tristar_bullish", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_tristar_bearish",
                      label: {
                        text: t("quotation.candle_tristar_bearish", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "candle_3whitesoldiers",
                      label: {
                        text: t("quotation.candle_3whitesoldiers", {
                          ns: "fields",
                        }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "rec_wr",
                      label: { text: t("quotation.rec_wr", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
                      name: "rec_uo",
                      label: { text: t("quotation.rec_uo", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
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
