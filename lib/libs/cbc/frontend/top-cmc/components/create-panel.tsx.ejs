import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useTopCmcCreate } from "@/features/cbc/top-cmc";
import { TopCmc } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type TopCmcCreatePanelRef = {
  submit: () => void;
};

export type TopCmcCreatePanelProps = {
  onCreated?: (data: TopCmc) => void;
};

const TopCmcCreatePanel = forwardRef(
  ({ onCreated }: TopCmcCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createTopCmc } = useTopCmcCreate();

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
          const createdData = await createTopCmc({
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

TopCmcCreatePanel.displayName = "TopCmcCreatePanel";

export default TopCmcCreatePanel;
