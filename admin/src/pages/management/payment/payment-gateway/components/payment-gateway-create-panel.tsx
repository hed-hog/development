import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { usePaymentGatewayCreate } from '@/features/payment/payment-gateway'
import { PaymentGateway } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type PaymentGatewayCreatePanelRef = {
  submit: () => void
}

export type PaymentGatewayCreatePanelProps = {
  onCreated?: (data: PaymentGateway) => void
}

const PaymentGatewayCreatePanel = forwardRef(
  ({ onCreated }: PaymentGatewayCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createPaymentGateway } = usePaymentGatewayCreate()

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
            label: { text: t('payment_gateway.name', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'slug',
            label: { text: t('payment_gateway.slug', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createPaymentGateway({
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

PaymentGatewayCreatePanel.displayName = 'PaymentGatewayCreatePanel'

export default PaymentGatewayCreatePanel
