import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useComponentPropGet,
  useComponentPropUpdate,
} from "@/features/page/component-prop";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { ComponentProp } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type ComponentPropUpdatePanelProps = {
  data: ComponentProp;
  onUpdated?: (data: ComponentProp) => void;
};

const ComponentPropUpdatePanel = forwardRef(
  ({ data, onUpdated }: ComponentPropUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useComponentPropGet(data.id as number);
    const { mutate: componentPropUpdate } = useComponentPropUpdate();
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
                  fields={[]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    componentPropUpdate({
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

ComponentPropUpdatePanel.displayName = "ComponentPropUpdatePanel";

export default ComponentPropUpdatePanel;
