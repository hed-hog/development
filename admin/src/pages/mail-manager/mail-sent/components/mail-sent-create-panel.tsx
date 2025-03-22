import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useMailSentCreate } from "@/features/mail-manager/mail-sent";
import { MailSent } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type MailSentCreatePanelRef = {
  submit: () => void;
};

export type MailSentCreatePanelProps = {
  onCreated?: (data: MailSent) => void;
};

const MailSentCreatePanel = forwardRef(
  ({ onCreated }: MailSentCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createMailSent } = useMailSentCreate();

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
          const createdData = await createMailSent({
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

MailSentCreatePanel.displayName = "MailSentCreatePanel";

export default MailSentCreatePanel;
