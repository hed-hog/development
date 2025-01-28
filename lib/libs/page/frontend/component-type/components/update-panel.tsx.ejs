import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useComponentTypeGet,
  useComponentTypeUpdate,
} from "@/features/page/component-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { ComponentType } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type ComponentTypeUpdatePanelProps = {
  data: ComponentType;
  onUpdated?: (data: ComponentType) => void;
};

const ComponentTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: ComponentTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useComponentTypeGet(data.id as number);
    const { mutate: componentTypeUpdate } = useComponentTypeUpdate();
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
                  fields={[...getFieldsLocale([{ name: "name" }], item)]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    componentTypeUpdate({
                      id: data.id,
                      data,
                    });
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

ComponentTypeUpdatePanel.displayName = "ComponentTypeUpdatePanel";

export default ComponentTypeUpdatePanel;
