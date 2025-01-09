import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";

import { useComponentTypeCreate } from "@/features/page/component-type";
import { ComponentType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ComponentTypeCreatePanelRef = {
  submit: () => void;
};

export type ComponentTypeCreatePanelProps = {
  onCreated?: (data: ComponentType) => void;
};

const ComponentTypeCreatePanel = forwardRef(
  ({ onCreated }: ComponentTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createComponentType } = useComponentTypeCreate();

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
          const createdData = await createComponentType({
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

ComponentTypeCreatePanel.displayName = "ComponentTypeCreatePanel";

export default ComponentTypeCreatePanel;
