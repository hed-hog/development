import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  usePaymentGatewayGet,
  usePaymentGatewayUpdate,
} from '@/features/payment/payment-gateway'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PaymentGateway } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type PaymentGatewayUpdatePanelProps = {
  data: PaymentGateway
  onUpdated?: (data: PaymentGateway) => void
}

const PaymentGatewayUpdatePanel = forwardRef(
  ({ data, onUpdated }: PaymentGatewayUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = usePaymentGatewayGet(data.id as number)
    const { mutate: paymentGatewayUpdate } = usePaymentGatewayUpdate()
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
                        text: t('payment_gateway.name', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                    {
                      name: 'slug',
                      label: {
                        text: t('payment_gateway.slug', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    paymentGatewayUpdate({
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

PaymentGatewayUpdatePanel.displayName = 'PaymentGatewayUpdatePanel'

export default PaymentGatewayUpdatePanel
