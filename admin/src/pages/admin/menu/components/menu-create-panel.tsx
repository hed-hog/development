import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";

import { useMenuCreate } from "@/features/admin/menu";
import { Menu } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type MenuCreatePanelRef = {
  submit: () => void;
};

export type MenuCreatePanelProps = {
  onCreated?: (data: Menu) => void;
};

const MenuCreatePanel = forwardRef(
  ({ onCreated }: MenuCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createMenu } = useMenuCreate();

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
          const createdData = await createMenu({
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

MenuCreatePanel.displayName = "MenuCreatePanel";

export default MenuCreatePanel;
