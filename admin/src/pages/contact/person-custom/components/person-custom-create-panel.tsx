import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePersonCustomCreate } from "@/features/contact/person-custom";
import { PersonCustom } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonCustomCreatePanelRef = {
  submit: () => void;
};

export type PersonCustomCreatePanelProps = {
  onCreated?: (data: PersonCustom) => void;
};

const PersonCustomCreatePanel = forwardRef(
  ({ onCreated }: PersonCustomCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createPersonCustom } = usePersonCustomCreate();

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
            url: "/person-custom-type",
            displayName: "type",
            valueName: "id",
          },

          {
            name: "value",
            label: { text: t("value", { ns: "translation" }) },
            type: EnumFieldType.RICHTEXT,
            required: true,
          },

          ...getFieldsLocale([{ name: "name" }]),
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonCustom(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

PersonCustomCreatePanel.displayName = "PersonCustomCreatePanel";

export default PersonCustomCreatePanel;