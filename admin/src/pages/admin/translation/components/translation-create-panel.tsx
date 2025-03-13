import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useTranslationCreate } from "@/features/admin/translation";
import { Translation } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type TranslationCreatePanelRef = {
  submit: () => void;
};

export type TranslationCreatePanelProps = {
  onCreated?: (data: Translation) => void;
};

const TranslationCreatePanel = forwardRef(
  ({ onCreated }: TranslationCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createTranslation } = useTranslationCreate();

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
          const createdData = await createTranslation({
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

TranslationCreatePanel.displayName = "TranslationCreatePanel";

export default TranslationCreatePanel;
