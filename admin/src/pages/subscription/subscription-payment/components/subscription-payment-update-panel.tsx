import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useSubscriptionPaymentGet,
  useSubscriptionPaymentUpdate,
} from '@/features/subscription/subscription-payment'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Payment } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { SubscriptionPayment } from '@/types/models/SubscriptionPayment'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type SubscriptionPaymentUpdatePanelProps = {
  id: number
  data: SubscriptionPayment
  onUpdated?: (data: Payment) => void
}

const SubscriptionPaymentUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: SubscriptionPaymentUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useSubscriptionPaymentGet(
      id,
      data.id as number
    )
    const { mutate: subscriptionPaymentUpdate } = useSubscriptionPaymentUpdate()
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
                      name: 'payment_id',
                      type: EnumFieldType.COMBOBOX,
                      label: {
                        text: t('subscription.payment_id', { ns: 'fields' }),
                      },
                      required: true,
                      url: '/payment',
                      displayName: 'name',
                      valueName: 'id',
                    },
                    {
                      name: 'start_at',
                      type: EnumFieldType.DATEPICKER,
                      label: {
                        text: t('subscription.start_at', { ns: 'fields' }),
                      },
                      required: true,
                    },
                    {
                      name: 'end_at',
                      type: EnumFieldType.DATEPICKER,
                      label: {
                        text: t('subscription.end_at', { ns: 'fields' }),
                      },
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    subscriptionPaymentUpdate({
                      subscriptionId: id,
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

SubscriptionPaymentUpdatePanel.displayName = 'SubscriptionPaymentUpdatePanel'

export default SubscriptionPaymentUpdatePanel
