import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useSubscriptionPlanItemGet,
  useSubscriptionPlanItemUpdate,
} from '@/features/subscription/subscription-plan-item'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Item } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type SubscriptionPlanItemUpdatePanelProps = {
  data: Item
  onUpdated?: (data: Item) => void
}

const SubscriptionPlanItemUpdatePanel = forwardRef(
  ({ data, onUpdated }: SubscriptionPlanItemUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useSubscriptionPlanItemGet(
      data.id as number
    )
    const { mutate: subscriptionPlanItemUpdate } =
      useSubscriptionPlanItemUpdate()
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
                        text: t('subscription-plan-item.slug', {
                          ns: 'fields',
                        }),
                      },
                      required: true,
                      type: EnumFieldType.TEXT,
                    },
                    {
                      name: 'name',
                      label: {
                        text: t('subscription-plan-item.name', {
                          ns: 'fields',
                        }),
                      },
                      required: true,
                      type: EnumFieldType.TEXT,
                    },
                    {
                      name: 'price',
                      label: {
                        text: t('subscription-plan-item.price', {
                          ns: 'fields',
                        }),
                      },
                      required: true,
                      type: EnumFieldType.NUMBER,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    subscriptionPlanItemUpdate({
                      id: data.id,
                      data: {
                        ...data,
                        price: Number(data.price),
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

SubscriptionPlanItemUpdatePanel.displayName = 'SubscriptionPlanItemUpdatePanel'

export default SubscriptionPlanItemUpdatePanel
