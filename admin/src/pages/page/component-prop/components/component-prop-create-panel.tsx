import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useComponentPropCreate } from "@/features/page/component-prop";
import { ComponentProp } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ComponentPropCreatePanelRef = {
  submit: () => void;
};

export type ComponentPropCreatePanelProps = {
  onCreated?: (data: ComponentProp) => void;
};

const ComponentPropCreatePanel = forwardRef(
  ({ onCreated }: ComponentPropCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createComponentProp } = useComponentPropCreate();

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
          const createdData = await createComponentProp({
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

ComponentPropCreatePanel.displayName = "ComponentPropCreatePanel";

export default ComponentPropCreatePanel;
