import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";

import { usePaymentCouponItemCreate } from "@/features/payment/payment-coupon-item";
import { PaymentCouponItem } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PaymentCouponItemCreatePanelRef = {
  submit: () => void;
};

export type PaymentCouponItemCreatePanelProps = {
  id: number;
  onCreated?: (data: PaymentCouponItem) => void;
};

const PaymentCouponItemCreatePanel = forwardRef(
  ({ id, onCreated }: PaymentCouponItemCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { mutateAsync: createPaymentCouponItem } =
      usePaymentCouponItemCreate();

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
          const createdData = await createPaymentCouponItem({
            couponId: Number(id),
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

PaymentCouponItemCreatePanel.displayName = "PaymentCouponItemCreatePanel";

export default PaymentCouponItemCreatePanel;
