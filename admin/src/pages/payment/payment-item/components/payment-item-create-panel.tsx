import FormPanel, { FormPanelRef } from '@/components/panels/form-panel';

import { usePaymentItemCreate } from '@/features/payment/payment-item';
import { PaymentItem } from '@/types/models';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export type PaymentItemCreatePanelRef = {
  submit: () => void;
};

export type PaymentItemCreatePanelProps = {
  id: number;
  onCreated?: (data: PaymentItem) => void;
};

const PaymentItemCreatePanel = forwardRef(
  ({ id, onCreated }: PaymentItemCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null);
    const { t } = useTranslation(['actions', 'fields', 'translations']);
    const { mutateAsync: createPaymentItem } = usePaymentItemCreate();

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
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createPaymentItem({
            paymentId: Number(id),
            data,
          });
          if (typeof onCreated === 'function') {
            onCreated(createdData as any);
          }
        }}
      />
    );
  },
);

PaymentItemCreatePanel.displayName = 'PaymentItemCreatePanel';

export default PaymentItemCreatePanel;
