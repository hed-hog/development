import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { useSubscriptionPlanGatewayCreate } from '@/features/subscription/subscription-plan-gateway'
import { SubscriptionPlanGateway } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type SubscriptionPlanGatewayCreatePanelRef = {
  submit: () => void
}

export type SubscriptionPlanGatewayCreatePanelProps = {
  id: number
  onCreated?: (data: SubscriptionPlanGateway) => void
}

const SubscriptionPlanGatewayCreatePanel = forwardRef(
  ({ id, onCreated }: SubscriptionPlanGatewayCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createSubscriptionPlanGateway } =
      useSubscriptionPlanGatewayCreate()

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
            name: 'gateway_id',
            type: EnumFieldType.COMBOBOX,
            label: {
              text: t('subscription.gateway_id', { ns: 'fields' }),
            },
            required: true,
            url: '/payment-gateway',
            displayName: 'name',
            valueName: 'id',
          },
          {
            name: 'gateway_plan_id',
            type: EnumFieldType.COMBOBOX,
            label: {
              text: t('subscription.plan_id', { ns: 'fields' }),
            },
            required: true,
            url: '/subscription-plan',
            displayName: 'name',
            valueName: 'id',
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createSubscriptionPlanGateway({
            planId: Number(id),
            data: {
              ...data,
              gateway_id: Number(data.gateway_id),
              gateway_plan_id: String(data.gateway_plan_id),
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

SubscriptionPlanGatewayCreatePanel.displayName =
  'SubscriptionPlanGatewayCreatePanel'

export default SubscriptionPlanGatewayCreatePanel
