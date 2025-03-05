import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  usePaymentMethodGet,
  usePaymentMethodUpdate,
} from '@/features/payment/payment-method'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PaymentMethod } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type PaymentMethodUpdatePanelProps = {
  data: PaymentMethod
  onUpdated?: (data: PaymentMethod) => void
}

const PaymentMethodUpdatePanel = forwardRef(
  ({ data, onUpdated }: PaymentMethodUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = usePaymentMethodGet(data.id as number)
    const { mutate: paymentMethodUpdate } = usePaymentMethodUpdate()
    const formRef = useRef<FormPanelRef>(null)

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
                      name: 'name',
                      label: {
                        text: t('payment_method.name', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                    {
                      name: 'slug',
                      label: {
                        text: t('payment_method.slug', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    paymentMethodUpdate({
                      id: data.id,
                      data,
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

PaymentMethodUpdatePanel.displayName = 'PaymentMethodUpdatePanel'

export default PaymentMethodUpdatePanel
