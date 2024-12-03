import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePersonCustomTypeCreate } from "@/features/contact/person-custom-type";
import { PersonCustomType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonCustomTypeCreatePanelRef = {
  submit: () => void;
};

export type PersonCustomTypeCreatePanelProps = {
  onCreated?: (data: PersonCustomType) => void;
};

const PersonCustomTypeCreatePanel = forwardRef(
  ({ onCreated }: PersonCustomTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createPersonCustomType } = usePersonCustomTypeCreate();

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
            name: "slug",
            label: { text: t("person_custom_type.slug", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          ...getFieldsLocale([{ name: "name" }]),
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonCustomType({
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

PersonCustomTypeCreatePanel.displayName = "PersonCustomTypeCreatePanel";

export default PersonCustomTypeCreatePanel;
