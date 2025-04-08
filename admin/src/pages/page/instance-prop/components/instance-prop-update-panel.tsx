import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useInstancePropGet,
  useInstancePropUpdate,
} from "@/features/page/instance-prop";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { InstanceProp } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type InstancePropUpdatePanelProps = {
  data: InstanceProp;
  onUpdated?: (data: InstanceProp) => void;
};

const InstancePropUpdatePanel = forwardRef(
  ({ data, onUpdated }: InstancePropUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useInstancePropGet(data.id as number);
    const { mutate: instancePropUpdate } = useInstancePropUpdate();
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
                    instancePropUpdate({
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

InstancePropUpdatePanel.displayName = "InstancePropUpdatePanel";

export default InstancePropUpdatePanel;
