import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";

import { useContactusSubjectCreate } from "@/features/blog/contactus-subject";
import { ContactusSubject } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type ContactusSubjectCreatePanelRef = {
  submit: () => void;
};

export type ContactusSubjectCreatePanelProps = {
  onCreated?: (data: ContactusSubject) => void;
};

const ContactusSubjectCreatePanel = forwardRef(
  ({ onCreated }: ContactusSubjectCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createContactusSubject } = useContactusSubjectCreate();

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
          const createdData = await createContactusSubject(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

ContactusSubjectCreatePanel.displayName = "ContactusSubjectCreatePanel";

export default ContactusSubjectCreatePanel;
