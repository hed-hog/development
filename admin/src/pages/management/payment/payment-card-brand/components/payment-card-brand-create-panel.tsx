import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { usePaymentCardBrandCreate } from '@/features/payment/payment-card-brand'
import { PaymentCardBrand } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type PaymentCardBrandCreatePanelRef = {
  submit: () => void
}

export type PaymentCardBrandCreatePanelProps = {
  onCreated?: (data: PaymentCardBrand) => void
}

const PaymentCardBrandCreatePanel = forwardRef(
  ({ onCreated }: PaymentCardBrandCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createPaymentCardBrand } = usePaymentCardBrandCreate()

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
            label: { text: t('payment_card_brand.name', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'slug',
            label: {
              text: t('payment_card_brand.slug', { ns: 'fields' }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createPaymentCardBrand({
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

PaymentCardBrandCreatePanel.displayName = 'PaymentCardBrandCreatePanel'

export default PaymentCardBrandCreatePanel
