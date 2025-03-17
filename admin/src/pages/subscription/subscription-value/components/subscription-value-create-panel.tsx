import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { useSubscriptionValueCreate } from '@/features/subscription/subscription-value'
import { SubscriptionValue } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type SubscriptionValueCreatePanelRef = {
  submit: () => void
}

export type SubscriptionValueCreatePanelProps = {
  id: number
  onCreated?: (data: SubscriptionValue) => void
}

const SubscriptionValueCreatePanel = forwardRef(
  ({ id, onCreated }: SubscriptionValueCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createSubscriptionValue } =
      useSubscriptionValueCreate()

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
            type: EnumFieldType.TEXT,
            label: {
              text: t('subscription.name', { ns: 'fields' }),
            },
            required: true,
          },
          {
            name: 'value',
            type: EnumFieldType.TEXT,
            label: {
              text: t('subscription.value', { ns: 'fields' }),
            },
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createSubscriptionValue({
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

SubscriptionValueCreatePanel.displayName = 'SubscriptionValueCreatePanel'

export default SubscriptionValueCreatePanel
