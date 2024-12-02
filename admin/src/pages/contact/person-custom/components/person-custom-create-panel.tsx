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
    const { t } = useTranslation(["actions", "fields", "translations"]);
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
            name: "value",
            label: { text: t("person_custom.value", { ns: "fields" }) },
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
