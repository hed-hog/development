import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePaymentNotificationGet,
  usePaymentNotificationUpdate,
} from "@/features/payment/payment-notification";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PaymentNotification } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type PaymentNotificationUpdatePanelProps = {
  id: number;
  data: PaymentNotification;
  onUpdated?: (data: PaymentNotification) => void;
};

const PaymentNotificationUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: PaymentNotificationUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = usePaymentNotificationGet(
      id,
      data.id as number,
    );
    const { mutate: paymentNotificationUpdate } =
      usePaymentNotificationUpdate();
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
                    paymentNotificationUpdate({
                      paymentId: id,
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

PaymentNotificationUpdatePanel.displayName = "PaymentNotificationUpdatePanel";

export default PaymentNotificationUpdatePanel;
