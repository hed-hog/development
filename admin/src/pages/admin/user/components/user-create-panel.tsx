import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useUserCreate } from "@/features/admin/user";
import { User } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type UserCreatePanelRef = {
  submit: () => void;
};

export type UserCreatePanelProps = {
  onCreated?: (data: User) => void;
};

const UserCreatePanel = forwardRef(
  ({ onCreated }: UserCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createUser } = useUserCreate();

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
          const createdData = await createUser({
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

UserCreatePanel.displayName = "UserCreatePanel";

export default UserCreatePanel;
