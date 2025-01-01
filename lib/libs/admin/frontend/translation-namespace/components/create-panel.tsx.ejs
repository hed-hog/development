import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useTranslationNamespaceCreate } from "@/features/admin/translation-namespace";
import { TranslationNamespace } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type TranslationNamespaceCreatePanelRef = {
  submit: () => void;
};

export type TranslationNamespaceCreatePanelProps = {
  onCreated?: (data: TranslationNamespace) => void;
};

const TranslationNamespaceCreatePanel = forwardRef(
  ({ onCreated }: TranslationNamespaceCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createTranslationNamespace } =
      useTranslationNamespaceCreate();

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
          const createdData = await createTranslationNamespace({
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

TranslationNamespaceCreatePanel.displayName = "TranslationNamespaceCreatePanel";

export default TranslationNamespaceCreatePanel;
