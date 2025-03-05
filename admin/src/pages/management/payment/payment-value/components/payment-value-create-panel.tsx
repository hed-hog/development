import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { usePaymentValueCreate } from '@/features/payment/payment-value'
import { PaymentValue } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type PaymentValueCreatePanelRef = {
  submit: () => void
}

export type PaymentValueCreatePanelProps = {
  id: number
  onCreated?: (data: PaymentValue) => void
}

const PaymentValueCreatePanel = forwardRef(
  ({ id, onCreated }: PaymentValueCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createPaymentValue } = usePaymentValueCreate()

    useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          formRef.current?.submit()
        },
      }),
      [formRef]
    )

    return (
      <FormPanel
        ref={formRef}
        fields={[
          {
            name: 'name',
            label: { text: t('payment_value.name', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'value',
            label: { text: t('payment_value.value', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createPaymentValue({
            paymentId: Number(id),
            data,
          })
          if (typeof onCreated === 'function') {
            onCreated(createdData as any)
          }
        }}
      />
    )
  }
)

PaymentValueCreatePanel.displayName = 'PaymentValueCreatePanel'

export default PaymentValueCreatePanel
