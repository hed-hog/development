import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useOperationCreate } from "@/features/cbc/operation";
import { Operation } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type OperationCreatePanelRef = {
  submit: () => void;
};

export type OperationCreatePanelProps = {
  onCreated?: (data: Operation) => void;
};

const OperationCreatePanel = forwardRef(
  ({ onCreated }: OperationCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createOperation } = useOperationCreate();

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
            name: "user_id",
            label: { text: t("operation.user_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/user",
            displayName: "user",
            valueName: "id",
          },

          {
            name: "banking_id",
            label: { text: t("operation.banking_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/banking",
            displayName: "banking",
            valueName: "id",
          },

          {
            name: "stock_exchange_id",
            label: { text: t("operation.stock_exchange_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/stock-exchange",
            displayName: "stock_exchange",
            valueName: "id",
          },

          {
            name: "strategy_id",
            label: { text: t("operation.strategy_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/strategy",
            displayName: "strategy",
            valueName: "id",
          },

          {
            name: "trade_signal_type_id",
            label: {
              text: t("operation.trade_signal_type_id", { ns: "fields" }),
            },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/trade-signal-type",
            displayName: "trade_signal_type",
            valueName: "id",
          },

          {
            name: "coin_id",
            label: { text: t("operation.coin_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/coin",
            displayName: "coin",
            valueName: "id",
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createOperation({
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

OperationCreatePanel.displayName = "OperationCreatePanel";

export default OperationCreatePanel;
