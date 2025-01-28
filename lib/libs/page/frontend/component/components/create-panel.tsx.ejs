import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useComponentCreate } from "@/features/page/component";
import { Component } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ComponentCreatePanelRef = {
  submit: () => void;
};

export type ComponentCreatePanelProps = {
  onCreated?: (data: Component) => void;
};

const ComponentCreatePanel = forwardRef(
  ({ onCreated }: ComponentCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createComponent } = useComponentCreate();

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
          const createdData = await createComponent({
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

ComponentCreatePanel.displayName = "ComponentCreatePanel";

export default ComponentCreatePanel;
