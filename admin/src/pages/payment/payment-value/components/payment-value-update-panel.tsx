import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePaymentValueGet,
  usePaymentValueUpdate,
} from "@/features/payment/payment-value";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PaymentValue } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type PaymentValueUpdatePanelProps = {
  id: number;
  data: PaymentValue;
  onUpdated?: (data: PaymentValue) => void;
};

const PaymentValueUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: PaymentValueUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = usePaymentValueGet(id, data.id as number);
    const { mutate: paymentValueUpdate } = usePaymentValueUpdate();
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
                    paymentValueUpdate({
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

PaymentValueUpdatePanel.displayName = "PaymentValueUpdatePanel";

export default PaymentValueUpdatePanel;
