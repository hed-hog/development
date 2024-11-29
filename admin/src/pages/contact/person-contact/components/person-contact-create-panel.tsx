import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePersonContactCreate } from "@/features/contact/person-contact";
import { PersonContact } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonContactCreatePanelRef = {
  submit: () => void;
};

export type PersonContactCreatePanelProps = {
  onCreated?: (data: PersonContact) => void;
};

const PersonContactCreatePanel = forwardRef(
  ({ onCreated }: PersonContactCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createPersonContact } = usePersonContactCreate();

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
            name: "person_id",
            label: { text: t("person_id", { ns: "translation" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/person",
            displayName: "person",
            valueName: "id",
          },

          {
            name: "type_id",
            label: { text: t("type_id", { ns: "translation" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/person-contact-type",
            displayName: "type",
            valueName: "id",
          },

          {
            name: "primary",
            label: { text: t("primary", { ns: "translation" }) },
            type: EnumFieldType.SWITCH,
            required: true,
          },

          {
            name: "value",
            label: { text: t("value", { ns: "translation" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonContact(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

PersonContactCreatePanel.displayName = "PersonContactCreatePanel";

export default PersonContactCreatePanel;
