import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { usePersonContactTypeCreate } from "@/features/contact/person-contact-type";
import { PersonContactType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonContactTypeCreatePanelRef = {
  submit: () => void;
};

export type PersonContactTypeCreatePanelProps = {
  onCreated?: (data: PersonContactType) => void;
};

const PersonContactTypeCreatePanel = forwardRef(
  ({ onCreated }: PersonContactTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createPersonContactType } =
      usePersonContactTypeCreate();

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
            label: { text: t("slug", { ns: "translation" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          ...getFieldsLocale([{ name: "name" }]),
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonContactType(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

PersonContactTypeCreatePanel.displayName = "PersonContactTypeCreatePanel";

export default PersonContactTypeCreatePanel;
