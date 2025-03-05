import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { useSubscriptionPlanItemCreate } from '@/features/subscription/subscription-plan-item'
import { SubscriptionPlan } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type SubscriptionPlanItemCreatePanelRef = {
  submit: () => void
}

export type SubscriptionPlanItemCreatePanelProps = {
  onCreated?: (data: SubscriptionPlan) => void
}

const SubscriptionPlanItemCreatePanel = forwardRef(
  ({ onCreated }: SubscriptionPlanItemCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createSubscriptionPlanItem } =
      useSubscriptionPlanItemCreate()

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
            name: 'slug',
            label: {
              text: t('subscription-plan-item.slug', { ns: 'fields' }),
            },
            required: true,
            type: EnumFieldType.TEXT,
          },
          {
            name: 'name',
            label: {
              text: t('subscription-plan-item.name', { ns: 'fields' }),
            },
            required: true,
            type: EnumFieldType.TEXT,
          },
          {
            name: 'price',
            label: {
              text: t('subscription-plan-item.price', { ns: 'fields' }),
            },
            required: true,
            type: EnumFieldType.NUMBER,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createSubscriptionPlanItem({
            data: {
              ...data,
              price: Number(data.price),
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

SubscriptionPlanItemCreatePanel.displayName = 'SubscriptionPlanItemCreatePanel'

export default SubscriptionPlanItemCreatePanel
