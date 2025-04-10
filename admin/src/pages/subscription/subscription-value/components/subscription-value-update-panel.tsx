import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useSubscriptionValueGet,
  useSubscriptionValueUpdate,
} from '@/features/subscription/subscription-value'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { SubscriptionValue } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type SubscriptionValueUpdatePanelProps = {
  id: number
  data: SubscriptionValue
  onUpdated?: (data: SubscriptionValue) => void
}

const SubscriptionValueUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: SubscriptionValueUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useSubscriptionValueGet(
      id,
      data.id as number
    )
    const { mutate: subscriptionValueUpdate } = useSubscriptionValueUpdate()
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
                      type: EnumFieldType.TEXT,
                      label: {
                        text: t('subscription.name', { ns: 'fields' }),
                      },
                      required: true,
                    },
                    {
                      name: 'value',
                      type: EnumFieldType.TEXT,
                      label: {
                        text: t('subscription.value', { ns: 'fields' }),
                      },
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    subscriptionValueUpdate({
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

SubscriptionValueUpdatePanel.displayName = 'SubscriptionValueUpdatePanel'

export default SubscriptionValueUpdatePanel
