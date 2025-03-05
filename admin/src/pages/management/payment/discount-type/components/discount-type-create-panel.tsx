import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useDiscountTypeCreate } from '@/features/payment/discount-type'
import { DiscountType } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type DiscountTypeCreatePanelRef = {
  submit: () => void
}

export type DiscountTypeCreatePanelProps = {
  onCreated?: (data: DiscountType) => void
}

const DiscountTypeCreatePanel = forwardRef(
  ({ onCreated }: DiscountTypeCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createDiscountType } = useDiscountTypeCreate()

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
            label: { text: t('discount_type.name', { ns: 'fields' }) },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'slug',
            label: {
              text: t('discount_type.slug', { ns: 'fields' }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createDiscountType({
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

DiscountTypeCreatePanel.displayName = 'DiscountTypeCreatePanel'

export default DiscountTypeCreatePanel
