import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useSubscriptionPlanGet,
  useSubscriptionPlanUpdate,
} from '@/features/subscription/subscription-plan'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { SubscriptionPlan } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type SubscriptionPlanUpdatePanelProps = {
  data: SubscriptionPlan
  onUpdated?: (data: SubscriptionPlan) => void
}

const SubscriptionPlanUpdatePanel = forwardRef(
  ({ data, onUpdated }: SubscriptionPlanUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useSubscriptionPlanGet(data.id as number)
    const { mutate: subscriptionPlanUpdate } = useSubscriptionPlanUpdate()
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
                      name: 'slug',
                      label: {
                        text: t('subscription-plan.slug', {
                          ns: 'fields',
                        }),
                      },
                      required: true,
                      type: EnumFieldType.TEXT,
                    },
                    {
                      name: 'duration',
                      label: {
                        text: t('subscription-plan.duration', {
                          ns: 'fields',
                        }),
                      },
                      required: true,
                      type: EnumFieldType.TEXT,
                    },
                    {
                      name: 'item_id',
                      label: {
                        text: t('subscription-plan.item-id', { ns: 'fields' }),
                      },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: '/item',
                      displayName: 'item',
                      valueName: 'id',
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    subscriptionPlanUpdate({
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

SubscriptionPlanUpdatePanel.displayName = 'SubscriptionPlanUpdatePanel'

export default SubscriptionPlanUpdatePanel
