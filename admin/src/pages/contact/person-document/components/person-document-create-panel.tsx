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
  id: number;
  onCreated?: (data: PersonDocument) => void;
};

const PersonDocumentCreatePanel = forwardRef(
  ({ id, onCreated }: PersonDocumentCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
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
            name: "type_id",
            label: { text: t("person_document.type_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/person-document-type",
            displayName: "type",
            valueName: "id",
          },

          {
            name: "country_id",
            label: { text: t("person_document.country_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/country",
            displayName: "country",
            valueName: "id",
          },

          {
            name: "primary",
            label: { text: t("person_document.primary", { ns: "fields" }) },
            type: EnumFieldType.SWITCH,
            required: true,
          },

          {
            name: "value",
            label: { text: t("person_document.value", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "issued_at",
            label: { text: t("person_document.issued_at", { ns: "fields" }) },
            type: EnumFieldType.DATEPICKER,
            required: true,
          },

          {
            name: "expiry_at",
            label: { text: t("person_document.expiry_at", { ns: "fields" }) },
            type: EnumFieldType.DATEPICKER,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonDocument({
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

PersonDocumentCreatePanel.displayName = "PersonDocumentCreatePanel";

export default PersonDocumentCreatePanel;
