import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";

import { useComponentPropTypeCreate } from "@/features/page/component-prop-type";
import { ComponentPropType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ComponentPropTypeCreatePanelRef = {
  submit: () => void;
};

export type ComponentPropTypeCreatePanelProps = {
  onCreated?: (data: ComponentPropType) => void;
};

const ComponentPropTypeCreatePanel = forwardRef(
  ({ onCreated }: ComponentPropTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createComponentPropType } =
      useComponentPropTypeCreate();

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
        fields={[...getFieldsLocale([{ name: "name" }])]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createComponentPropType({
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

ComponentPropTypeCreatePanel.displayName = "ComponentPropTypeCreatePanel";

export default ComponentPropTypeCreatePanel;
