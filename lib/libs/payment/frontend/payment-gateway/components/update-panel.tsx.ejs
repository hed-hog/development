import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";

import {
  usePaymentGatewayGet,
  usePaymentGatewayUpdate,
} from "@/features/blog/payment-gateway";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PaymentGateway } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PaymentGatewayUpdatePanelProps = {
  data: PaymentGateway;
  onUpdated?: (data: PaymentGateway) => void;
};

const PaymentGatewayUpdatePanel = forwardRef(
  ({ data, onUpdated }: PaymentGatewayUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions"]);
    const { data: item, isLoading } = usePaymentGatewayGet(data.id as number);
    const { mutate: paymentGatewayUpdate } = usePaymentGatewayUpdate();
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
                  fields={[...getFieldsLocale([{ name: "name" }])]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    paymentGatewayUpdate({ id: data.id, data });
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

PaymentGatewayUpdatePanel.displayName = "PaymentGatewayUpdatePanel";

export default PaymentGatewayUpdatePanel;
