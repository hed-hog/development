import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useTop100Create } from "@/features/cbc/top-100";
import { Top100 } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type Top100CreatePanelRef = {
  submit: () => void;
};

export type Top100CreatePanelProps = {
  onCreated?: (data: Top100) => void;
};

const Top100CreatePanel = forwardRef(
  ({ onCreated }: Top100CreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createTop100 } = useTop100Create();

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
          const createdData = await createTop100({
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

Top100CreatePanel.displayName = "Top100CreatePanel";

export default Top100CreatePanel;
