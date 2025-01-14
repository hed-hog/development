import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useTopCoinsCreate } from "@/features/cbc/top-coins";
import { TopCoins } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type TopCoinsCreatePanelRef = {
  submit: () => void;
};

export type TopCoinsCreatePanelProps = {
  onCreated?: (data: TopCoins) => void;
};

const TopCoinsCreatePanel = forwardRef(
  ({ onCreated }: TopCoinsCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createTopCoins } = useTopCoinsCreate();

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
          const createdData = await createTopCoins({
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

TopCoinsCreatePanel.displayName = "TopCoinsCreatePanel";

export default TopCoinsCreatePanel;
