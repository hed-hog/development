import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useInstanceCreate } from "@/features/page/instance";
import { Instance } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type InstanceCreatePanelRef = {
  submit: () => void;
};

export type InstanceCreatePanelProps = {
  onCreated?: (data: Instance) => void;
};

const InstanceCreatePanel = forwardRef(
  ({ onCreated }: InstanceCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createInstance } = useInstanceCreate();

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
          const createdData = await createInstance({
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

InstanceCreatePanel.displayName = "InstanceCreatePanel";

export default InstanceCreatePanel;
