import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useTradeSignalTypeCreate } from "@/features/cbc/trade-signal-type";
import { TradeSignalType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type TradeSignalTypeCreatePanelRef = {
  submit: () => void;
};

export type TradeSignalTypeCreatePanelProps = {
  onCreated?: (data: TradeSignalType) => void;
};

const TradeSignalTypeCreatePanel = forwardRef(
  ({ onCreated }: TradeSignalTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createTradeSignalType } = useTradeSignalTypeCreate();

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
            label: { text: t("trade_signal_type.name", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createTradeSignalType({
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

TradeSignalTypeCreatePanel.displayName = "TradeSignalTypeCreatePanel";

export default TradeSignalTypeCreatePanel;
