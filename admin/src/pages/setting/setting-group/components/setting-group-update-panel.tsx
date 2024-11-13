import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { EnumFieldType } from "@/enums/EnumFieldType";
import {
  useSettingGroupGet,
  useSettingGroupUpdate,
} from "@/features/blog/setting-group";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { SettingGroup } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type SettingGroupUpdatePanelProps = {
  data: SettingGroup;
  onUpdated?: (data: SettingGroup) => void;
};

const SettingGroupUpdatePanel = forwardRef(
  ({ data, onUpdated }: SettingGroupUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = useSettingGroupGet(data.id as number);
    const { mutate: settingGroupUpdate } = useSettingGroupUpdate();
    const formRef = useRef<FormPanelRef>(null);

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item);
      }
    }, [item]);

    useImperativeHandle(ref, () => ({}));

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t("details", { ns: "actions" }),
            children: (
              <Overlay loading={isLoading}>
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
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    settingGroupUpdate({ id: data.id, data });
                    if (typeof onUpdated === "function") {
                      onUpdated(data);
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
    );
  },
);

SettingGroupUpdatePanel.displayName = "SettingGroupUpdatePanel";

export default SettingGroupUpdatePanel;
