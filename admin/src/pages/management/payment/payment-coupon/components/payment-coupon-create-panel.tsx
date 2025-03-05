import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { usePaymentCouponCreate } from '@/features/payment/payment-coupon'
import { PaymentCoupon } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type PaymentCouponCreatePanelRef = {
  submit: () => void
}

export type PaymentCouponCreatePanelProps = {
  onCreated?: (data: PaymentCoupon) => void
}

const PaymentCouponCreatePanel = forwardRef(
  ({ onCreated }: PaymentCouponCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createPaymentCoupon } = usePaymentCouponCreate()

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
            name: 'code',
            label: {
              text: t('payment_coupon.code', { ns: 'fields' }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'discount_type_id',
            label: {
              text: t('payment.discount_type_id', { ns: 'fields' }),
            },
            type: EnumFieldType.COMBOBOX,
            required: true,
            url: '/discount-type',
            displayName: 'discount-type',
            valueName: 'id',
          },
          {
            name: 'description',
            label: {
              text: t('payment_coupon.description', { ns: 'fields' }),
            },
            type: EnumFieldType.TEXT,
            required: true,
          },
          {
            name: 'value',
            label: {
              text: t('payment_coupon.value', { ns: 'fields' }),
            },
            type: EnumFieldType.NUMBER,
            required: true,
          },
          {
            name: 'active',
            label: {
              text: t('payment_coupon.active', { ns: 'fields' }),
            },
            type: EnumFieldType.SWITCH,
            required: true,
          },
          {
            name: 'uses_limit',
            label: {
              text: t('payment_coupon.uses_limit', { ns: 'fields' }),
            },
            type: EnumFieldType.NUMBER,
            required: true,
          },
          {
            name: 'uses_qtd',
            label: {
              text: t('payment_coupon.uses_qtd', { ns: 'fields' }),
            },
            type: EnumFieldType.NUMBER,
            required: true,
          },
          {
            name: 'starts_at',
            label: {
              text: t('payment_coupon.starts_at', { ns: 'fields' }),
            },
            type: EnumFieldType.DATEPICKER,
            required: true,
          },
          {
            name: 'ends_at',
            label: {
              text: t('payment_coupon.ends_at', { ns: 'fields' }),
            },
            type: EnumFieldType.DATEPICKER,
            required: true,
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createPaymentCoupon({
            data: {
              ...data,
              uses_qtd: parseInt(data.uses_qtd as string),
              uses_limit: parseInt(data.uses_limit as string),
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

PaymentCouponCreatePanel.displayName = 'PaymentCouponCreatePanel'

export default PaymentCouponCreatePanel
