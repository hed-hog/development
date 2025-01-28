import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { usePaymentMethodItemCreate } from "@/features/payment/payment-method-item";
import { PaymentMethodItem } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PaymentMethodItemCreatePanelRef = {
  submit: () => void;
};

export type PaymentMethodItemCreatePanelProps = {
  onCreated?: (data: PaymentMethodItem) => void;
};

const PaymentMethodItemCreatePanel = forwardRef(
  ({ onCreated }: PaymentMethodItemCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createPaymentMethodItem } =
      usePaymentMethodItemCreate();

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
          const createdData = await createPaymentMethodItem({
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

PaymentMethodItemCreatePanel.displayName = "PaymentMethodItemCreatePanel";

export default PaymentMethodItemCreatePanel;
