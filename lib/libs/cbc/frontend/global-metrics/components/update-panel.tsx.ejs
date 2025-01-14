import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useGlobalMetricsGet,
  useGlobalMetricsUpdate,
} from "@/features/cbc/global-metrics";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { GlobalMetrics } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type GlobalMetricsUpdatePanelProps = {
  data: GlobalMetrics;
  onUpdated?: (data: GlobalMetrics) => void;
};

const GlobalMetricsUpdatePanel = forwardRef(
  ({ data, onUpdated }: GlobalMetricsUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useGlobalMetricsGet(data.id as number);
    const { mutate: globalMetricsUpdate } = useGlobalMetricsUpdate();
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
                    globalMetricsUpdate({
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

GlobalMetricsUpdatePanel.displayName = "GlobalMetricsUpdatePanel";

export default GlobalMetricsUpdatePanel;
