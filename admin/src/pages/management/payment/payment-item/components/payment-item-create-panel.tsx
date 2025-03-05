import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { usePaymentItemCreate } from '@/features/payment/payment-item'
import { PaymentItem } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type PaymentItemCreatePanelRef = {
  submit: () => void
}

export type PaymentItemCreatePanelProps = {
  id: number
  onCreated?: (data: PaymentItem) => void
}

const PaymentItemCreatePanel = forwardRef(
  ({ id, onCreated }: PaymentItemCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createPaymentItem } = usePaymentItemCreate()

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
            name: 'item_id',
            type: EnumFieldType.COMBOBOX,
            label: {
              text: t('payment.item_id', { ns: 'fields' }),
            },
            url: '/item',
            displayName: 'name',
            valueName: 'id',
          },
          {
            name: 'unit_price',
            type: EnumFieldType.NUMBER,
            label: {
              text: t('payment.unit_price', { ns: 'fields' }),
            },
          },
          {
            name: 'delivered',
            type: EnumFieldType.NUMBER,
            label: {
              text: t('payment.delivered', { ns: 'fields' }),
            },
          },
          {
            name: 'quantity',
            type: EnumFieldType.NUMBER,
            label: {
              text: t('payment.quantity', { ns: 'fields' }),
            },
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createPaymentItem({
            paymentId: Number(id),
            data: {
              ...data,
              unit_price: parseFloat(data.unit_price),
              delivered: parseFloat(data.delivered),
              quantity: parseFloat(data.quantity),
            },
          })
          if (typeof onCreated === 'function') {
            onCreated(createdData as any)
          }
        }}
      />
    )
  }
)

PaymentItemCreatePanel.displayName = 'PaymentItemCreatePanel'

export default PaymentItemCreatePanel
