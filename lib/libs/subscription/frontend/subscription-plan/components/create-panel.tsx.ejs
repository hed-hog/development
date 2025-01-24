import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";

import { useSubscriptionPlanCreate } from "@/features/subscription/subscription-plan";
import { SubscriptionPlan } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type SubscriptionPlanCreatePanelRef = {
  submit: () => void;
};

export type SubscriptionPlanCreatePanelProps = {
  onCreated?: (data: SubscriptionPlan) => void;
};

const SubscriptionPlanCreatePanel = forwardRef(
  ({ onCreated }: SubscriptionPlanCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createSubscriptionPlan } = useSubscriptionPlanCreate();

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
        fields={[...getFieldsLocale([{ name: "name" }])]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createSubscriptionPlan({
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

SubscriptionPlanCreatePanel.displayName = "SubscriptionPlanCreatePanel";

export default SubscriptionPlanCreatePanel;
