import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useGlobalMetricGet,
  useGlobalMetricUpdate,
} from "@/features/cbc/global-metric";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { GlobalMetric } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type GlobalMetricUpdatePanelProps = {
  data: GlobalMetric;
  onUpdated?: (data: GlobalMetric) => void;
};

const GlobalMetricUpdatePanel = forwardRef(
  ({ data, onUpdated }: GlobalMetricUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useGlobalMetricGet(data.id as number);
    const { mutate: globalMetricUpdate } = useGlobalMetricUpdate();
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
                    globalMetricUpdate({
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

GlobalMetricUpdatePanel.displayName = "GlobalMetricUpdatePanel";

export default GlobalMetricUpdatePanel;
