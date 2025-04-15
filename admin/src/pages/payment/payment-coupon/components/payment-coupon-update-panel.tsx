import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  usePaymentCouponGet,
  usePaymentCouponUpdate,
} from '@/features/payment/payment-coupon'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PaymentCoupon } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type PaymentCouponUpdatePanelProps = {
  data: PaymentCoupon
  onUpdated?: (data: PaymentCoupon) => void
}

const PaymentCouponUpdatePanel = forwardRef(
  ({ data, onUpdated }: PaymentCouponUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = usePaymentCouponGet(data.id as number)
    const { mutate: paymentCouponUpdate } = usePaymentCouponUpdate()
    const formRef = useRef<FormPanelRef>(null)
    const [selectedIds, setSelectedIds] = useState<Record<string, any>[]>([])

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item)
      }
    }, [item])

    useImperativeHandle(ref, () => ({}))

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t('details', { ns: 'actions' }),
            children: (
              <Overlay loading={isLoading}>
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
                    {
                      name: 'products',
                      type: EnumFieldType.PICKER,
                      label: {
                        text: t('subscription-plan.item-id', { ns: 'fields' }),
                      },
                      required: true,
                      url: '/item',
                      value: selectedIds,
                      onChange: setSelectedIds,
                      columnName: t('subscription-plan.item-id', {
                        ns: 'fields',
                      }),
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    paymentCouponUpdate({
                      id: data.id,
                      data: {
                        ...data,
                        uses_qtd: parseInt(data.uses_qtd as string),
                        uses_limit: parseInt(data.uses_limit as string),
                        product_ids: data.products.map((item: any) => item.id),
                      },
                    })
                    if (typeof onUpdated === 'function') {
                      onUpdated(data)
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
    )
  }
)

PaymentCouponUpdatePanel.displayName = 'PaymentCouponUpdatePanel'

export default PaymentCouponUpdatePanel
