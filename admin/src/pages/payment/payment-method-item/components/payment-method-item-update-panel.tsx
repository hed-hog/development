import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  usePaymentMethodItemGet,
  usePaymentMethodItemUpdate,
} from '@/features/payment/payment-method-item'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PaymentMethodItem } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export type PaymentMethodItemUpdatePanelProps = {
  data: PaymentMethodItem
  onUpdated?: (data: PaymentMethodItem) => void
}

const PaymentMethodItemUpdatePanel = forwardRef(
  ({ data, onUpdated }: PaymentMethodItemUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = usePaymentMethodItemGet(data.id as number)
    const { mutate: paymentMethodItemUpdate } = usePaymentMethodItemUpdate()
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
                  fields={[]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    paymentMethodItemUpdate({
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

PaymentMethodItemUpdatePanel.displayName = 'PaymentMethodItemUpdatePanel'

export default PaymentMethodItemUpdatePanel
