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
    const { t } = useTranslation(["actions"]);
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
            label: { text: t("country_id", { ns: "translation" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "slug",
            label: { text: t("slug", { ns: "translation" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          ...getFieldsLocale([{ name: "name" }]),
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonDocumentType(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

PersonDocumentTypeCreatePanel.displayName = "PersonDocumentTypeCreatePanel";

export default PersonDocumentTypeCreatePanel;
