import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { useSubscriptionPlanCreate } from '@/features/subscription/subscription-plan'
import { SubscriptionPlan } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type SubscriptionPlanCreatePanelRef = {
  submit: () => void
}

export type SubscriptionPlanCreatePanelProps = {
  onCreated?: (data: SubscriptionPlan) => void
}

const SubscriptionPlanCreatePanel = forwardRef(
  ({ onCreated }: SubscriptionPlanCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createSubscriptionPlan } = useSubscriptionPlanCreate()

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
              text: t('subscription-plan.slug', {
                ns: 'fields',
              }),
            },
            required: true,
            type: EnumFieldType.TEXT,
          },
          {
            name: 'duration',
            label: {
              text: t('subscription-plan.duration', {
                ns: 'fields',
              }),
            },
            required: true,
            type: EnumFieldType.TEXT,
          },
          {
            name: 'item_id',
            label: { text: t('subscription-plan.item-id', { ns: 'fields' }) },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: '/item',
            displayName: 'item',
            valueName: 'id',
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createSubscriptionPlan({
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

SubscriptionPlanCreatePanel.displayName = 'SubscriptionPlanCreatePanel'

export default SubscriptionPlanCreatePanel
