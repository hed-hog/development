import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'

import { usePaymentCreate } from '@/features/payment/payment'
import { Payment } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type PaymentCreatePanelRef = {
  submit: () => void
}

export type PaymentCreatePanelProps = {
  onCreated?: (data: Payment) => void
}

const PaymentCreatePanel = forwardRef(
  ({ onCreated }: PaymentCreatePanelProps, ref) => {
    const formRef = useRef<FormPanelRef>(null)
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { mutateAsync: createPayment } = usePaymentCreate()

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
            type: EnumFieldType.TEXT,
            label: {
              text: t('payment.slug', { ns: 'fields' }),
            },
            required: true,
          },
          {
            name: 'person_id',
            type: EnumFieldType.COMBOBOX,
            label: {
              text: t('payment.person_id', { ns: 'fields' }),
            },
            url: '/person',
            displayName: 'name',
            valueName: 'id',
          },
          {
            name: 'gateway_id',
            type: EnumFieldType.COMBOBOX,
            label: {
              text: t('payment.gateway_id', { ns: 'fields' }),
            },
            required: true,
            url: '/payment-gateway',
            displayName: 'name',
            valueName: 'id',
          },
          {
            name: 'amount',
            type: EnumFieldType.NUMBER,
            label: {
              text: t('payment.amount', { ns: 'fields' }),
            },
            required: true,
          },
          {
            name: 'status_id',
            type: EnumFieldType.COMBOBOX,
            label: {
              text: t('payment.status_id', { ns: 'fields' }),
            },
            required: true,
            url: '/payment-status',
            displayName: 'name',
            valueName: 'id',
          },
          {
            name: 'document',
            type: EnumFieldType.TEXT,
            label: {
              text: t('payment.document', { ns: 'fields' }),
            },
          },
          {
            name: 'payment_at',
            type: EnumFieldType.DATEPICKER,
            label: {
              text: t('payment.payment_at', { ns: 'fields' }),
            },
          },
          {
            name: 'currency',
            type: EnumFieldType.TEXT,
            label: {
              text: t('payment.currency', { ns: 'fields' }),
            },
            required: true,
          },
          {
            name: 'method_id',
            type: EnumFieldType.COMBOBOX,
            label: {
              text: t('payment.method_id', { ns: 'fields' }),
            },
            url: '/payment-method',
            displayName: 'name',
            valueName: 'id',
          },
          {
            name: 'brand_id',
            type: EnumFieldType.COMBOBOX,
            label: {
              text: t('payment.brand_id', { ns: 'fields' }),
            },
            url: '/payment-card-brand',
            displayName: 'name',
            valueName: 'id',
          },
          {
            name: 'installments',
            type: EnumFieldType.NUMBER,
            label: {
              text: t('payment.installments', { ns: 'fields' }),
            },
          },
          {
            name: 'delivered',
            type: EnumFieldType.NUMBER,
            label: {
              text: t('payment.delivered', { ns: 'fields' }),
            },
          },
          {
            name: 'coupon_id',
            type: EnumFieldType.COMBOBOX,
            label: {
              text: t('payment.coupon_id', { ns: 'fields' }),
            },
            url: '/payment-coupon',
            displayName: 'code',
            valueName: 'id',
          },
          {
            name: 'discount',
            type: EnumFieldType.TEXT,
            label: {
              text: t('payment.discount', { ns: 'fields' }),
            },
          },
        ]}
        button={{ text: t('create', { ns: 'actions' }) }}
        onSubmit={async (data) => {
          const createdData = await createPayment({
            data: {
              ...data,
              amount: parseFloat(data.amount),
              discount: parseFloat(data.discount),
              installments: parseInt(data.installments),
              delivered: parseInt(data.delivered),
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

PaymentCreatePanel.displayName = 'PaymentCreatePanel'

export default PaymentCreatePanel
