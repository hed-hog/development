import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { usePaymentNotificationCreate } from "@/features/payment/payment-notification";
import { PaymentNotification } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PaymentNotificationCreatePanelRef = {
  submit: () => void;
};

export type PaymentNotificationCreatePanelProps = {
  id: number;
  onCreated?: (data: PaymentNotification) => void;
};

const PaymentNotificationCreatePanel = forwardRef(
  ({ id, onCreated }: PaymentNotificationCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createPaymentNotification } =
      usePaymentNotificationCreate();

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
          const createdData = await createPaymentNotification({
            paymentId: Number(id),
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

PaymentNotificationCreatePanel.displayName = "PaymentNotificationCreatePanel";

export default PaymentNotificationCreatePanel;
