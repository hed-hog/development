import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useSubscriptionPlanItemCreate } from "@/features/subscription/subscription-plan-item";
import { SubscriptionPlanItem } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type SubscriptionPlanItemCreatePanelRef = {
  submit: () => void;
};

export type SubscriptionPlanItemCreatePanelProps = {
  onCreated?: (data: SubscriptionPlanItem) => void;
};

const SubscriptionPlanItemCreatePanel = forwardRef(
  ({ onCreated }: SubscriptionPlanItemCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createSubscriptionPlanItem } =
      useSubscriptionPlanItemCreate();

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
          const createdData = await createSubscriptionPlanItem({
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

SubscriptionPlanItemCreatePanel.displayName = "SubscriptionPlanItemCreatePanel";

export default SubscriptionPlanItemCreatePanel;
