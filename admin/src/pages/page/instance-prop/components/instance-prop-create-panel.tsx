import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useInstancePropCreate } from "@/features/page/instance-prop";
import { InstanceProp } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type InstancePropCreatePanelRef = {
  submit: () => void;
};

export type InstancePropCreatePanelProps = {
  onCreated?: (data: InstanceProp) => void;
};

const InstancePropCreatePanel = forwardRef(
  ({ onCreated }: InstancePropCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createInstanceProp } = useInstancePropCreate();

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
          const createdData = await createInstanceProp({
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

InstancePropCreatePanel.displayName = "InstancePropCreatePanel";

export default InstancePropCreatePanel;
