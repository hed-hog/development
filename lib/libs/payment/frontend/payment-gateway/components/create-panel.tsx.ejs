import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";

import { usePaymentGatewayCreate } from "@/features/blog/payment-gateway";
import { PaymentGateway } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

export type PaymentGatewayCreatePanelRef = {
  submit: () => void;
};

export type PaymentGatewayCreatePanelProps = {
  onCreated?: (data: PaymentGateway) => void;
};

const PaymentGatewayCreatePanel = forwardRef(
  ({ onCreated }: PaymentGatewayCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(["actions"]);
    const { mutateAsync: createPaymentGateway } = usePaymentGatewayCreate();

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
        fields={[...getFieldsLocale([{ name: "name" }])]}
        button={{ text: t("create", { ns: "actions" }) }}
        onSubmit={async (data) => {
          const createdData = await createPaymentGateway(data);
          if (typeof onCreated === "function") {
            onCreated(createdData);
          }
        }}
      />
    );
  },
);

PaymentGatewayCreatePanel.displayName = "PaymentGatewayCreatePanel";

export default PaymentGatewayCreatePanel;
