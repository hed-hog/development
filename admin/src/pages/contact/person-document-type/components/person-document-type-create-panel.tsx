import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePersonDocumentTypeCreate } from "@/features/contact/person-document-type";
import { PersonDocumentType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonDocumentTypeCreatePanelRef = {
  submit: () => void;
};

export type PersonDocumentTypeCreatePanelProps = {
  onCreated?: (data: PersonDocumentType) => void;
};

const PersonDocumentTypeCreatePanel = forwardRef(
  ({ onCreated }: PersonDocumentTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createPersonDocumentType } =
      usePersonDocumentTypeCreate();

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
            name: "country_id",
            label: {
              text: t("person_document_type.country_id", { ns: "fields" }),
            },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/country",
            displayName: "country",
            valueName: "id",
          },

          {
            name: "slug",
            label: { text: t("person_document_type.slug", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          ...getFieldsLocale([{ name: "name" }]),
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonDocumentType({
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

PersonDocumentTypeCreatePanel.displayName = "PersonDocumentTypeCreatePanel";

export default PersonDocumentTypeCreatePanel;
