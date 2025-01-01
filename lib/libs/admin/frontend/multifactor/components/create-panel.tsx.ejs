import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";

import { useMultifactorCreate } from "@/features/admin/multifactor";
import { Multifactor } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type MultifactorCreatePanelRef = {
  submit: () => void;
};

export type MultifactorCreatePanelProps = {
  onCreated?: (data: Multifactor) => void;
};

const MultifactorCreatePanel = forwardRef(
  ({ onCreated }: MultifactorCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createMultifactor } = useMultifactorCreate();

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
          const createdData = await createMultifactor({
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

MultifactorCreatePanel.displayName = "MultifactorCreatePanel";

export default MultifactorCreatePanel;
