import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { usePaymentCouponCreate } from "@/features/payment/payment-coupon";
import { PaymentCoupon } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PaymentCouponCreatePanelRef = {
  submit: () => void;
};

export type PaymentCouponCreatePanelProps = {
  onCreated?: (data: PaymentCoupon) => void;
};

const PaymentCouponCreatePanel = forwardRef(
  ({ onCreated }: PaymentCouponCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createPaymentCoupon } = usePaymentCouponCreate();

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
          const createdData = await createPaymentCoupon({
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

PaymentCouponCreatePanel.displayName = "PaymentCouponCreatePanel";

export default PaymentCouponCreatePanel;
