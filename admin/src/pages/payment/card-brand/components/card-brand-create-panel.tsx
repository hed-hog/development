import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useCardBrandCreate } from '@/features/payment/card-brand'
import { PaymentCardBrand } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type CardBrandCreatePanelRef = {
  submit: () => void
}

export type CardBrandCreatePanelProps = {
  onCreated?: (data: PaymentCardBrand) => void
}

const CardBrandCreatePanel = forwardRef(
  ({ onCreated }: CardBrandCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createCardBrand } = useCardBrandCreate()

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
            label: { text: t('card_brand.name', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createCardBrand({
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

CardBrandCreatePanel.displayName = 'CardBrandCreatePanel'

export default CardBrandCreatePanel
