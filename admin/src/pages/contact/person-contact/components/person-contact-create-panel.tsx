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
  id: number;
  onCreated?: (data: PersonContact) => void;
};

const PersonContactCreatePanel = forwardRef(
  ({ id, onCreated }: PersonContactCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
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
            name: "type_id",
            label: { text: t("person_contact.type_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/person-contact-type",
            displayName: "type",
            valueName: "id",
          },

          {
            name: "primary",
            label: { text: t("person_contact.primary", { ns: "fields" }) },
            type: EnumFieldType.SWITCH,
            required: true,
          },

          {
            name: "value",
            label: { text: t("person_contact.value", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonContact({
            personId: Number(id),
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

PersonContactCreatePanel.displayName = "PersonContactCreatePanel";

export default PersonContactCreatePanel;
