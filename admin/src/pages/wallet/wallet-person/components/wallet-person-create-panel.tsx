import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useWalletPersonCreate } from "@/features/wallet/wallet-person";
import { WalletPerson } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type WalletPersonCreatePanelRef = {
  submit: () => void;
};

export type WalletPersonCreatePanelProps = {
  onCreated?: (data: WalletPerson) => void;
};

const WalletPersonCreatePanel = forwardRef(
  ({ onCreated }: WalletPersonCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createWalletPerson } = useWalletPersonCreate();

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
            label: { text: t("wallet_person.wallet_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/wallet",
            displayName: "wallet",
            valueName: "id",
          },

          {
            name: "person_id",
            label: { text: t("wallet_person.person_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/person",
            displayName: "person",
            valueName: "id",
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createWalletPerson({
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

WalletPersonCreatePanel.displayName = "WalletPersonCreatePanel";

export default WalletPersonCreatePanel;
