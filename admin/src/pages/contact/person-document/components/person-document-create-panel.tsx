import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePersonDocumentCreate } from "@/features/contact/person-document";
import { PersonDocument } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonDocumentCreatePanelRef = {
  submit: () => void;
};

export type PersonDocumentCreatePanelProps = {
  onCreated?: (data: PersonDocument) => void;
};

const PersonDocumentCreatePanel = forwardRef(
  ({ onCreated }: PersonDocumentCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createPersonDocument } = usePersonDocumentCreate();

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
            url: "/person-document-type",
            displayName: "type",
            valueName: "id",
          },

          {
            name: "country_id",
            label: { text: t("country_id", { ns: "translation" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/country",
            displayName: "country",
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

          {
            name: "issued_at",
            label: { text: t("issued_at", { ns: "translation" }) },
            type: EnumFieldType.DATEPICKER,
            required: true,
          },

          {
            name: "expiry_at",
            label: { text: t("expiry_at", { ns: "translation" }) },
            type: EnumFieldType.DATEPICKER,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonDocument(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

PersonDocumentCreatePanel.displayName = "PersonDocumentCreatePanel";

export default PersonDocumentCreatePanel;
