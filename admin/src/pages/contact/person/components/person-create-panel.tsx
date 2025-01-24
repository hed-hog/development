import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePersonCreate } from "@/features/contact/person";
import { Person } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonCreatePanelRef = {
  submit: () => void;
};

export type PersonCreatePanelProps = {
  onCreated?: (data: Person) => void;
};

const PersonCreatePanel = forwardRef(
  ({ onCreated }: PersonCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createPerson } = usePersonCreate();

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
            name: "name",
            label: { text: t("person.name", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          {
            name: "photo_id",
            label: { text: t("person.photo_id", { ns: "fields" }) },
            type: EnumFieldType.FILE,
            required: true,
            url: "/file",
            displayName: "photo",
            valueName: "id",
          },

          {
            name: "type_id",
            label: { text: t("person.type_id", { ns: "fields" }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: "/person-type",
            displayName: "type",
            valueName: "id",
          },

          {
            name: "birth_at",
            label: { text: t("person.birth_at", { ns: "fields" }) },
            type: EnumFieldType.DATEPICKER,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPerson({
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

PersonCreatePanel.displayName = "PersonCreatePanel";

export default PersonCreatePanel;
