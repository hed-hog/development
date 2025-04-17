import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useSubscriptionPlanGatewayGet,
  useSubscriptionPlanGatewayUpdate,
} from '@/features/subscription/subscription-plan-gateway'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { SubscriptionPlanGateway } from '@/types/models'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EnumFieldType } from '@/enums/EnumFieldType'

export type SubscriptionPlanGatewayUpdatePanelProps = {
  id: number
  data: SubscriptionPlanGateway
  onUpdated?: (data: SubscriptionPlanGateway) => void
}

const SubscriptionPlanGatewayUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: SubscriptionPlanGatewayUpdatePanelProps, ref) => {
    const { t } = useTranslation(['actions', 'fields', 'translations'])
    const { data: item, isLoading } = useSubscriptionPlanGatewayGet(
      id,
      data.id as number
    )
    const { mutate: subscriptionPlanGatewayUpdate } =
      useSubscriptionPlanGatewayUpdate()
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
                      name: 'gateway_id',
                      type: EnumFieldType.COMBOBOX,
                      label: {
                        text: t('subscription.gateway_id', { ns: 'fields' }),
                      },
                      required: true,
                      url: '/payment-gateway',
                      displayName: 'name',
                      valueName: 'id',
                    },
                    {
                      name: 'gateway_plan_id',
                      type: EnumFieldType.COMBOBOX,
                      label: {
                        text: t('subscription.plan_id', {
                          ns: 'fields',
                        }),
                      },
                      required: true,
                      url: '/subscription-plan',
                      displayName: 'name',
                      valueName: 'id',
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    console.log({ data })

                    subscriptionPlanGatewayUpdate({
                      planId: id,
                      id: data.id,
                      data: {
                        ...data,
                        gateway_id: Number(data.gateway_id),
                        gateway_plan_id: String(data.gateway_plan_id),
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

SubscriptionPlanGatewayUpdatePanel.displayName =
  'SubscriptionPlanGatewayUpdatePanel'

export default SubscriptionPlanGatewayUpdatePanel
