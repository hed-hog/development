import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useGlobalMetricsCreate } from "@/features/cbc/global-metrics";
import { GlobalMetrics } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type GlobalMetricsCreatePanelRef = {
  submit: () => void;
};

export type GlobalMetricsCreatePanelProps = {
  onCreated?: (data: GlobalMetrics) => void;
};

const GlobalMetricsCreatePanel = forwardRef(
  ({ onCreated }: GlobalMetricsCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createGlobalMetrics } = useGlobalMetricsCreate();

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
          const createdData = await createGlobalMetrics({
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

GlobalMetricsCreatePanel.displayName = "GlobalMetricsCreatePanel";

export default GlobalMetricsCreatePanel;
