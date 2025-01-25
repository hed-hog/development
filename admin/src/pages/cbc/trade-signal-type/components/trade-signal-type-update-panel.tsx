import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useTradeSignalTypeGet,
  useTradeSignalTypeUpdate,
} from "@/features/cbc/trade-signal-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { TradeSignalType } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

export type TradeSignalTypeUpdatePanelProps = {
  data: TradeSignalType;
  onUpdated?: (data: TradeSignalType) => void;
};

const TradeSignalTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: TradeSignalTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useTradeSignalTypeGet(data.id as number);
    const { mutate: tradeSignalTypeUpdate } = useTradeSignalTypeUpdate();
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
                      name: "name",
                      label: {
                        text: t("trade_signal_type.name", { ns: "fields" }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    tradeSignalTypeUpdate({
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

TradeSignalTypeUpdatePanel.displayName = "TradeSignalTypeUpdatePanel";

export default TradeSignalTypeUpdatePanel;
