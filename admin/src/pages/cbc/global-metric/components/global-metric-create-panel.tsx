import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useGlobalMetricCreate } from "@/features/cbc/global-metric";
import { GlobalMetric } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type GlobalMetricCreatePanelRef = {
  submit: () => void;
};

export type GlobalMetricCreatePanelProps = {
  onCreated?: (data: GlobalMetric) => void;
};

const GlobalMetricCreatePanel = forwardRef(
  ({ onCreated }: GlobalMetricCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createGlobalMetric } = useGlobalMetricCreate();

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
          const createdData = await createGlobalMetric({
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

GlobalMetricCreatePanel.displayName = "GlobalMetricCreatePanel";

export default GlobalMetricCreatePanel;
