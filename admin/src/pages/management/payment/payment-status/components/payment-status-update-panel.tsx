import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  usePaymentStatusGet,
  usePaymentStatusUpdate,
} from '@/features/payment/payment-status'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { PaymentStatus } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type PaymentStatusUpdatePanelProps = {
  data: PaymentStatus
  onUpdated?: (data: PaymentStatus) => void
}

const PaymentStatusUpdatePanel = forwardRef(
  ({ data, onUpdated }: PaymentStatusUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = usePaymentStatusGet(data.id as number)
    const { mutate: paymentStatusUpdate } = usePaymentStatusUpdate()
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
                    ...getFieldsLocale([{ name: 'name' }], item),
                    {
                      name: 'slug',
                      label: {
                        text: t('payment_status.slug', { ns: 'fields' }),
                      },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    paymentStatusUpdate({
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

PaymentStatusUpdatePanel.displayName = 'PaymentStatusUpdatePanel'

export default PaymentStatusUpdatePanel
