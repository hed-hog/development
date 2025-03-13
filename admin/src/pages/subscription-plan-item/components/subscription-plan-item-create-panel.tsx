import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { useSubscriptionPlanItemCreate } from '@/features/subscription/subscription-plan-item'
import { SubscriptionPlan } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
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
    const [selectedIds, setSelectedIds] = useState<Record<string, any>[]>([])

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
          {
            name: 'coupons',
            type: EnumFieldType.PICKER,
            label: {
              text: t('payment.coupon_id', { ns: 'fields' }),
            },
            required: true,
            url: '/payment-coupon',
            value: selectedIds,
            onChange: setSelectedIds,
            columnName: t('payment.coupon_id', { ns: 'fields' }),
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createSubscriptionPlanItem({
            data: {
              ...data,
              price: Number(data.price),
              coupon_ids: data.coupons.map((coupon: any) => coupon.id),
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
