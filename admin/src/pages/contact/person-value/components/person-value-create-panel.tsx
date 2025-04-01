import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePersonValueCreate } from "@/features/contact/person-value";
import { PersonValue } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonValueCreatePanelRef = {
  submit: () => void;
};

export type PersonValueCreatePanelProps = {
  id: number;
  onCreated?: (data: PersonValue) => void;
};

const PersonValueCreatePanel = forwardRef(
  ({ id, onCreated }: PersonValueCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createPersonValue } = usePersonValueCreate();

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
            label: { text: t("person_value.value", { ns: "fields" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonValue({
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

PersonValueCreatePanel.displayName = "PersonValueCreatePanel";

export default PersonValueCreatePanel;
