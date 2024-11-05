import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import { useSettingGroupCreate } from "@/features/blog/setting-group";
import { SettingGroup } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type SettingGroupCreatePanelRef = {
  submit: () => void;
};

export type SettingGroupCreatePanelProps = {
  onCreated?: (data: SettingGroup) => void;
};

const SettingGroupCreatePanel = forwardRef(
  ({ onCreated }: SettingGroupCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createSettingGroup } = useSettingGroupCreate();

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
            name: "icon",
            label: { text: t("icon", { ns: "translation" }) },
            type: EnumFieldType.TEXT,
            required: true,
          },

          ...getFieldsLocale([{ name: "name" }]),
        ]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createSettingGroup(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

SettingGroupCreatePanel.displayName = "SettingGroupCreatePanel";

export default SettingGroupCreatePanel;
