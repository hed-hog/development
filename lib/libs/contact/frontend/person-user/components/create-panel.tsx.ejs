import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { usePersonUserCreate } from "@/features/contact/person-user";
import { PersonUser } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PersonUserCreatePanelRef = {
  submit: () => void;
};

export type PersonUserCreatePanelProps = {
  id: number;
  onCreated?: (data: PersonUser) => void;
};

const PersonUserCreatePanel = forwardRef(
  ({ id, onCreated }: PersonUserCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createPersonUser } = usePersonUserCreate();

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
        fields={[]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPersonUser({
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

PersonUserCreatePanel.displayName = "PersonUserCreatePanel";

export default PersonUserCreatePanel;
