import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { usePaymentCreate } from "@/features/payment/payment";
import { Payment } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PaymentCreatePanelRef = {
  submit: () => void;
};

export type PaymentCreatePanelProps = {
  onCreated?: (data: Payment) => void;
};

const PaymentCreatePanel = forwardRef(
  ({ onCreated }: PaymentCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createPayment } = usePaymentCreate();

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
          const createdData = await createPayment({
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

PaymentCreatePanel.displayName = "PaymentCreatePanel";

export default PaymentCreatePanel;
