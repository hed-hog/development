import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useTopCoinCreate } from "@/features/cbc/top-coin";
import { TopCoin } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type TopCoinCreatePanelRef = {
  submit: () => void;
};

export type TopCoinCreatePanelProps = {
  onCreated?: (data: TopCoin) => void;
};

const TopCoinCreatePanel = forwardRef(
  ({ onCreated }: TopCoinCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createTopCoin } = useTopCoinCreate();

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
          const createdData = await createTopCoin({
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

TopCoinCreatePanel.displayName = "TopCoinCreatePanel";

export default TopCoinCreatePanel;
