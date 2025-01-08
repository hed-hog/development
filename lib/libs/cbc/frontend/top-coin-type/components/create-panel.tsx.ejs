import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useTopCoinTypeCreate } from "@/features/cbc/top-coin-type";
import { TopCoinType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type TopCoinTypeCreatePanelRef = {
  submit: () => void;
};

export type TopCoinTypeCreatePanelProps = {
  onCreated?: (data: TopCoinType) => void;
};

const TopCoinTypeCreatePanel = forwardRef(
  ({ onCreated }: TopCoinTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createTopCoinType } = useTopCoinTypeCreate();

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
          const createdData = await createTopCoinType({
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

TopCoinTypeCreatePanel.displayName = "TopCoinTypeCreatePanel";

export default TopCoinTypeCreatePanel;
