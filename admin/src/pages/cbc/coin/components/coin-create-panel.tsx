import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useCoinCreate } from "@/features/cbc/coin";
import { Coin } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type CoinCreatePanelRef = {
  submit: () => void;
};

export type CoinCreatePanelProps = {
  onCreated?: (data: Coin) => void;
};

const CoinCreatePanel = forwardRef(
  ({ onCreated }: CoinCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createCoin } = useCoinCreate();

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
        fields={[]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createCoin({
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

CoinCreatePanel.displayName = "CoinCreatePanel";

export default CoinCreatePanel;
