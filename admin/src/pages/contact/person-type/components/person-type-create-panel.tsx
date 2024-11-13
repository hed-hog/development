import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";

import { usePersonTypeCreate } from "@/features/contact/person-type";
import { PersonType } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonTypeCreatePanelRef = {
  submit: () => void;
};

export type PersonTypeCreatePanelProps = {
  onCreated?: (data: PersonType) => void;
};

const PersonTypeCreatePanel = forwardRef(
  ({ onCreated }: PersonTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createPersonType } = usePersonTypeCreate();

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
        fields={[...getFieldsLocale([{ name: "name" }])]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonType(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

PersonTypeCreatePanel.displayName = "PersonTypeCreatePanel";

export default PersonTypeCreatePanel;
