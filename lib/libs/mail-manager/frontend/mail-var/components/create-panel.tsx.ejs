import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useMailVarCreate } from "@/features/mail-manager/mail-var";
import { MailVar } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type MailVarCreatePanelRef = {
  submit: () => void;
};

export type MailVarCreatePanelProps = {
  onCreated?: (data: MailVar) => void;
};

const MailVarCreatePanel = forwardRef(
  ({ onCreated }: MailVarCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createMailVar } = useMailVarCreate();

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
          const createdData = await createMailVar({
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

MailVarCreatePanel.displayName = "MailVarCreatePanel";

export default MailVarCreatePanel;
