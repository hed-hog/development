import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useStockExchangeGet,
  useStockExchangeUpdate,
} from "@/features/cbc/stock-exchange";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { StockExchange } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type StockExchangeUpdatePanelProps = {
  data: StockExchange;
  onUpdated?: (data: StockExchange) => void;
};

const StockExchangeUpdatePanel = forwardRef(
  ({ data, onUpdated }: StockExchangeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useStockExchangeGet(data.id as number);
    const { mutate: stockExchangeUpdate } = useStockExchangeUpdate();
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
                  fields={[]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    stockExchangeUpdate({
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

StockExchangeUpdatePanel.displayName = "StockExchangeUpdatePanel";

export default StockExchangeUpdatePanel;
