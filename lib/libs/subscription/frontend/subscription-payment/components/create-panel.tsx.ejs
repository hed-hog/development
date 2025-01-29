import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { useSubscriptionPaymentCreate } from "@/features/subscription/subscription-payment";
import { SubscriptionPayment } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type SubscriptionPaymentCreatePanelRef = {
  submit: () => void;
};

export type SubscriptionPaymentCreatePanelProps = {
  id: number;
  onCreated?: (data: SubscriptionPayment) => void;
};

const SubscriptionPaymentCreatePanel = forwardRef(
  ({ id, onCreated }: SubscriptionPaymentCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createSubscriptionPayment } =
      useSubscriptionPaymentCreate();

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
          const createdData = await createSubscriptionPayment({
            subscriptionId: Number(id),
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

SubscriptionPaymentCreatePanel.displayName = "SubscriptionPaymentCreatePanel";

export default SubscriptionPaymentCreatePanel;
