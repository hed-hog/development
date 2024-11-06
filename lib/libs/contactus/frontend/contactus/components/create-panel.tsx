import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useContactusCreate } from "@/features/blog/contactus";
import { Contactus } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ContactusCreatePanelRef = {
  submit: () => void;
};

export type ContactusCreatePanelProps = {
  onCreated?: (data: Contactus) => void;
};

const ContactusCreatePanel = forwardRef(
  ({ onCreated }: ContactusCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createContactus } = useContactusCreate();

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
        fields={[
          {
            name: "name",
            label: { text: t("name", { ns: "translation" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "email",
            label: { text: t("email", { ns: "translation" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "message",
            label: { text: t("message", { ns: "translation" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "subject_id",
            label: { text: t("subject_id", { ns: "translation" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createContactus(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

ContactusCreatePanel.displayName = "ContactusCreatePanel";

export default ContactusCreatePanel;
