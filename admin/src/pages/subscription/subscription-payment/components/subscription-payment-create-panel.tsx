import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { useSubscriptionPaymentCreate } from '@/features/subscription/subscription-payment'
import { Payment } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type SubscriptionPaymentCreatePanelRef = {
  submit: () => void
}

export type SubscriptionPaymentCreatePanelProps = {
  id: number
  onCreated?: (data: Payment) => void
}

const SubscriptionPaymentCreatePanel = forwardRef(
  ({ id, onCreated }: SubscriptionPaymentCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createSubscriptionPayment } =
      useSubscriptionPaymentCreate()

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
            name: 'payment_id',
            type: EnumFieldType.COMBOBOX,
            label: {
              text: t('subscription.payment_id', { ns: 'fields' }),
            },
            required: true,
            url: '/payment',
            displayName: 'name',
            valueName: 'id',
          },
          {
            name: 'start_at',
            type: EnumFieldType.DATEPICKER,
            label: {
              text: t('subscription.start_at', { ns: 'fields' }),
            },
            required: true,
          },
          {
            name: 'end_at',
            type: EnumFieldType.DATEPICKER,
            label: {
              text: t('subscription.end_at', { ns: 'fields' }),
            },
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createSubscriptionPayment({
            subscriptionId: Number(id),
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

SubscriptionPaymentCreatePanel.displayName = 'SubscriptionPaymentCreatePanel'

export default SubscriptionPaymentCreatePanel
