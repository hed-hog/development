import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useWalletTransactionCreate } from "@/features/wallet/wallet-transaction";
import { WalletTransaction } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type WalletTransactionCreatePanelRef = {
  submit: () => void;
};

export type WalletTransactionCreatePanelProps = {
  onCreated?: (data: WalletTransaction) => void;
};

const WalletTransactionCreatePanel = forwardRef(
  ({ onCreated }: WalletTransactionCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createWalletTransaction } =
      useWalletTransactionCreate();

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
            name: "wallet_id",
            label: {
              text: t("wallet_transaction.wallet_id", { ns: "fields" }),
            },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/wallet",
            displayName: "wallet",
            valueName: "id",
          },

          {
            name: "type",
            label: { text: t("wallet_transaction.type", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "amount",
            label: { text: t("wallet_transaction.amount", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createWalletTransaction({
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

WalletTransactionCreatePanel.displayName = "WalletTransactionCreatePanel";

export default WalletTransactionCreatePanel;
