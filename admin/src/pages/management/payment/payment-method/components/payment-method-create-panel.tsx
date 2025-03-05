import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { usePaymentMethodCreate } from '@/features/payment/payment-method'
import { PaymentMethod } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type PaymentMethodCreatePanelRef = {
  submit: () => void
}

export type PaymentMethodCreatePanelProps = {
  onCreated?: (data: PaymentMethod) => void
}

const PaymentMethodCreatePanel = forwardRef(
  ({ onCreated }: PaymentMethodCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createPaymentMethod } = usePaymentMethodCreate()

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
            label: { text: t('payment_method.name', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'slug',
            label: { text: t('payment_method.slug', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createPaymentMethod({
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

PaymentMethodCreatePanel.displayName = 'PaymentMethodCreatePanel'

export default PaymentMethodCreatePanel
