import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useStockExchangeCreate } from "@/features/cbc/stock-exchange";
import { StockExchange } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type StockExchangeCreatePanelRef = {
  submit: () => void;
};

export type StockExchangeCreatePanelProps = {
  onCreated?: (data: StockExchange) => void;
};

const StockExchangeCreatePanel = forwardRef(
  ({ onCreated }: StockExchangeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createStockExchange } = useStockExchangeCreate();

    useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          formRef.current?.submit();
        },
      }),
      [formRef],
    );

    return (
      <FormPanel
        ref={formRef}
        fields={[
          {
            name: "name",
            label: { text: t("stock_exchange.name", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createStockExchange({
            data,
          });
          if (typeof onCreated === "function") {
            onCreated(createdData as any);
          }
        }}
      />
    );
  },
);

StockExchangeCreatePanel.displayName = "StockExchangeCreatePanel";

export default StockExchangeCreatePanel;
