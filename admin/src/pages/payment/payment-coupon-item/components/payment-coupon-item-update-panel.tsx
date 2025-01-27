import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePaymentCouponItemGet,
  usePaymentCouponItemUpdate,
} from "@/features/payment/payment-coupon-item";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PaymentCouponItem } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type PaymentCouponItemUpdatePanelProps = {
  id: number;
  data: PaymentCouponItem;
  onUpdated?: (data: PaymentCouponItem) => void;
};

const PaymentCouponItemUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: PaymentCouponItemUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = usePaymentCouponItemGet(
      id,
      data.id as number,
    );
    const { mutate: paymentCouponItemUpdate } = usePaymentCouponItemUpdate();
    const formRef = useRef<FormPanelRef>(null);

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item);
      }
    }, [item]);

    useImperativeHandle(ref, () => ({}));

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t("details", { ns: "actions" }),
            children: (
              <Overlay loading={isLoading}>
                <FormPanel
                  ref={formRef}
                  fields={[]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    paymentCouponItemUpdate({
                      couponId: id,
                      id: data.id,
                      data,
                    });
                    if (typeof onUpdated === "function") {
                      onUpdated(data);
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
    );
  },
);

PaymentCouponItemUpdatePanel.displayName = "PaymentCouponItemUpdatePanel";

export default PaymentCouponItemUpdatePanel;
