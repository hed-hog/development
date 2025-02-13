import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useSubscriptionPlanGatewayCreate } from "@/features/subscription/subscription-plan-gateway";
import { SubscriptionPlanGateway } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type SubscriptionPlanGatewayCreatePanelRef = {
  submit: () => void;
};

export type SubscriptionPlanGatewayCreatePanelProps = {
  id: number;
  onCreated?: (data: SubscriptionPlanGateway) => void;
};

const SubscriptionPlanGatewayCreatePanel = forwardRef(
  ({ id, onCreated }: SubscriptionPlanGatewayCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createSubscriptionPlanGateway } =
      useSubscriptionPlanGatewayCreate();

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
          const createdData = await createSubscriptionPlanGateway({
            planId: Number(id),
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

SubscriptionPlanGatewayCreatePanel.displayName =
  "SubscriptionPlanGatewayCreatePanel";

export default SubscriptionPlanGatewayCreatePanel;
