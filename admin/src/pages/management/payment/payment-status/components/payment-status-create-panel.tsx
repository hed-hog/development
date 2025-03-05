import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { usePaymentStatusCreate } from '@/features/payment/payment-status'
import { PaymentStatus } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type PaymentStatusCreatePanelRef = {
  submit: () => void
}

export type PaymentStatusCreatePanelProps = {
  onCreated?: (data: PaymentStatus) => void
}

const PaymentStatusCreatePanel = forwardRef(
  ({ onCreated }: PaymentStatusCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createPaymentStatus } = usePaymentStatusCreate()

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
          ...getFieldsLocale([{ name: 'name' }]),
          {
            name: 'slug',
            label: { text: t('payment_status.slug', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createPaymentStatus({
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

PaymentStatusCreatePanel.displayName = 'PaymentStatusCreatePanel'

export default PaymentStatusCreatePanel
