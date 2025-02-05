import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useBankingCreate } from "@/features/cbc/banking";
import { Banking } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type BankingCreatePanelRef = {
  submit: () => void;
};

export type BankingCreatePanelProps = {
  onCreated?: (data: Banking) => void;
};

const BankingCreatePanel = forwardRef(
  ({ onCreated }: BankingCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createBanking } = useBankingCreate();

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
            label: { text: t("banking.name", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "user_id",
            label: { text: t("banking.user_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/user",
            displayName: "user",
            valueName: "id",
          },

          {
            name: "stock_exchange_id",
            label: { text: t("banking.stock_exchange_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/stock-exchange",
            displayName: "stock_exchange",
            valueName: "id",
          },

          {
            name: "strategy_id",
            label: { text: t("banking.strategy_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/strategy",
            displayName: "strategy",
            valueName: "id",
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createBanking({
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

BankingCreatePanel.displayName = "BankingCreatePanel";

export default BankingCreatePanel;
