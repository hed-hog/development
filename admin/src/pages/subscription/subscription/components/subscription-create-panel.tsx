import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useSubscriptionCreate } from "@/features/subscription/subscription";
import { Subscription } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type SubscriptionCreatePanelRef = {
  submit: () => void;
};

export type SubscriptionCreatePanelProps = {
  onCreated?: (data: Subscription) => void;
};

const SubscriptionCreatePanel = forwardRef(
  ({ onCreated }: SubscriptionCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createSubscription } = useSubscriptionCreate();

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
          const createdData = await createSubscription({
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

SubscriptionCreatePanel.displayName = "SubscriptionCreatePanel";

export default SubscriptionCreatePanel;
