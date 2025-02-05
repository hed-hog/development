import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePaymentItemGet,
  usePaymentItemUpdate,
} from "@/features/payment/payment-item";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PaymentItem } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type PaymentItemUpdatePanelProps = {
  id: number;
  data: PaymentItem;
  onUpdated?: (data: PaymentItem) => void;
};

const PaymentItemUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: PaymentItemUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = usePaymentItemGet(id, data.id as number);
    const { mutate: paymentItemUpdate } = usePaymentItemUpdate();
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
                    paymentItemUpdate({
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

PaymentItemUpdatePanel.displayName = "PaymentItemUpdatePanel";

export default PaymentItemUpdatePanel;
