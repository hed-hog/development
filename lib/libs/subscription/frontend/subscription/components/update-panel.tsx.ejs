import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { Overlay } from '@/components/custom/overlay'
import { TabPanel } from '@/components/panels/tab-panel'
import {
  useSubscriptionGet,
  useSubscriptionUpdate,
} from '@/features/subscription/subscription'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Subscription } from '@/types/models'
import { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { SubscriptionPlanGateway } from '@/types/models/SubscriptionPlanGateway.ts'
import { useSubscriptionPlanGatewayDelete } from '@/features/subscription/subscription-plan-gateway'
import SubscriptionPlanGatewayCreatePanel from '@/pages/subscription/subscription-plan-gateway/components/subscription-plan-gateway-create-panel'
import SubscriptionPlanGatewayUpdatePanel from '@/pages/subscription/subscription-plan-gateway/components/subscription-plan-gateway-update-panel'
import { SubscriptionPerson } from '@/types/models/SubscriptionPerson.ts'
import { useSubscriptionPersonDelete } from '@/features/subscription/subscription-person'
import SubscriptionPersonCreatePanel from '@/pages/subscription/subscription-person/components/subscription-person-create-panel'
import SubscriptionPersonUpdatePanel from '@/pages/subscription/subscription-person/components/subscription-person-update-panel'
import { useSubscriptionPaymentDelete } from '@/features/subscription/subscription-payment'
import SubscriptionPaymentCreatePanel from '@/pages/subscription/subscription-payment/components/subscription-payment-create-panel'
import SubscriptionPaymentUpdatePanel from '@/pages/subscription/subscription-payment/components/subscription-payment-update-panel'
import DataPanel from '@/components/panels/data-panel'
import {
  IconCalendar,
  IconEdit,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'
import { SubscriptionPayment } from '@/types/models/SubscriptionPayment'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formatDate } from '@/lib/date-string'

export type SubscriptionUpdatePanelProps = {
  data: Subscription
  onUpdated?: (data: Subscription) => void
}

const SubscriptionUpdatePanel = forwardRef(
  ({ data, onUpdated }: SubscriptionUpdatePanelProps, ref) => {
    const { t } = useTranslation([
      'actions',
      'fields',
      'translations',
      'subscription.subscription-plan-gateway',
      'subscription.subscription-value',
      'subscription.subscription-person',
      'subscription.subscription-payment',
    ])
    const { data: item, isLoading } = useSubscriptionGet(data.id as number)
    const { mutate: subscriptionUpdate } = useSubscriptionUpdate()
    const formRef = useRef<FormPanelRef>(null)

    const { openDialog, confirm, closeDialog } = useApp()
    const [, setSelectedItems] = useState<any[]>([])
    const subscriptionPlanGatewayRef = useRef<any>(null)
    const { mutate: subscriptionPlanGatewayDelete } =
      useSubscriptionPlanGatewayDelete()
    const openCreateSubscriptionPlanGateway = () => {
      const id = openDialog({
        title: t('create', { ns: 'subscription.subscription-plan-gateway' }),
        description: t('createText', {
          ns: 'subscription.subscription-plan-gateway',
        }),
        children: () => (
          <SubscriptionPlanGatewayCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      })

      return id
    }
    const openUpdateSubscriptionPlanGateway = (
      itemSubscriptionPlanGateway: SubscriptionPlanGateway
    ) => {
      const id = openDialog({
        children: () => (
          <SubscriptionPlanGatewayUpdatePanel
            id={Number(item?.id)}
            data={itemSubscriptionPlanGateway}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t('edit', { ns: 'subscription.subscription-plan-gateway' }),
        description: t('editText', {
          ns: 'subscription.subscription-plan-gateway',
        }),
      })

      return id
    }
    const openDeleteSubscriptionPlanGateway = (
      items: SubscriptionPlanGateway[]
    ) => {
      return confirm({
        title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
        description: t('deleteText', {
          ns: 'subscription.subscription-plan-gateway',
        }),
      })
        .then(() =>
          subscriptionPlanGatewayDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          })
        )
        .catch(() => setSelectedItems(items))
    }

    const subscriptionPersonRef = useRef<any>(null)
    const { mutate: subscriptionPersonDelete } = useSubscriptionPersonDelete()
    const openCreateSubscriptionPerson = () => {
      const id = openDialog({
        title: t('create', { ns: 'subscription.subscription-person' }),
        description: t('createText', {
          ns: 'subscription.subscription-person',
        }),
        children: () => (
          <SubscriptionPersonCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      })

      return id
    }
    const openUpdateSubscriptionPerson = (
      itemSubscriptionPerson: SubscriptionPerson
    ) => {
      const id = openDialog({
        children: () => (
          <SubscriptionPersonUpdatePanel
            id={Number(item?.id)}
            data={itemSubscriptionPerson}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t('edit', { ns: 'subscription.subscription-person' }),
        description: t('editText', { ns: 'subscription.subscription-person' }),
      })

      return id
    }
    const openDeleteSubscriptionPerson = (items: SubscriptionPerson[]) => {
      return confirm({
        title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
        description: t('deleteText', {
          ns: 'subscription.subscription-person',
        }),
      })
        .then(() =>
          subscriptionPersonDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          })
        )
        .catch(() => setSelectedItems(items))
    }
    const subscriptionPaymentRef = useRef<any>(null)
    const { mutate: subscriptionPaymentDelete } = useSubscriptionPaymentDelete()
    const openCreateSubscriptionPayment = () => {
      const id = openDialog({
        title: t('create', { ns: 'subscription.subscription-payment' }),
        description: t('createText', {
          ns: 'subscription.subscription-payment',
        }),
        children: () => (
          <SubscriptionPaymentCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      })

      return id
    }
    const openUpdateSubscriptionPayment = (
      itemSubscriptionPayment: SubscriptionPayment
    ) => {
      const id = openDialog({
        children: () => (
          <SubscriptionPaymentUpdatePanel
            id={Number(item?.id)}
            data={itemSubscriptionPayment}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t('edit', { ns: 'subscription.subscription-payment' }),
        description: t('editText', { ns: 'subscription.subscription-payment' }),
      })

      return id
    }
    const openDeleteSubscriptionPayment = (items: SubscriptionPayment[]) => {
      return confirm({
        title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
        description: t('deleteText', {
          ns: 'subscription.subscription-payment',
        }),
      })
        .then(() =>
          subscriptionPaymentDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          })
        )
        .catch(() => setSelectedItems(items))
    }

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
                      name: 'plan_id',
                      type: EnumFieldType.COMBOBOX,
                      label: {
                        text: t('subscription.plan_id', { ns: 'fields' }),
                      },
                      required: true,
                      url: '/subscription-plan',
                      displayName: 'name',
                      valueName: 'id',
                    },
                    {
                      name: 'status',
                      type: EnumFieldType.TEXT,
                      label: {
                        text: t('subscription.status', { ns: 'fields' }),
                      },
                      required: true,
                    },
                    {
                      name: 'limit',
                      type: EnumFieldType.NUMBER,
                      label: {
                        text: t('subscription.limit', { ns: 'fields' }),
                      },
                      required: true,
                    },
                  ]}
                  button={{ text: t('save', { ns: 'actions' }) }}
                  onSubmit={(data) => {
                    subscriptionUpdate({
                      id: data.id,
                      data: {
                        ...data,
                        plan_id: Number(data.plan_id),
                        limit: Number(data.limit),
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
          {
            title: t('subscription_plan_gateway', { ns: 'modules' }),
            children: (
              <DataPanel
                ref={subscriptionPlanGatewayRef}
                selectable
                multiple
                layout='list'
                id={`subscription-plan-gateway-${item?.id}`}
                url={`/subscription-plan/${item?.id}/subscription-plan-gateway`}
                render={(item: SubscriptionPlanGateway) => (
                  <div className='flex flex-row gap-2'>
                    <span className='relative px-[0.3rem] py-[0.2rem] text-sm'>
                      {item.id}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
                    icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
                    label: t('edit', { ns: 'actions' }),
                    tooltip: t('editTooltip', {
                      ns: 'subscription.subscription-plan-gateway',
                    }),
                    handler: (items: SubscriptionPlanGateway[]) => {
                      if (items.length === 1)
                        openUpdateSubscriptionPlanGateway(items[0])
                    },
                    show: 'once',
                  },
                  {
                    icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
                    label: t('delete', { ns: 'actions' }),
                    tooltip: t('deleteTooltip', {
                      ns: 'subscription.subscription-plan-gateway',
                    }),
                    variant: 'destructive',
                    handler: (items: SubscriptionPlanGateway[]) => {
                      openDeleteSubscriptionPlanGateway(items)
                    },
                    show: 'some',
                  },
                  {
                    icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
                    label: t('create', { ns: 'actions' }),
                    tooltip: t('createTooltip', {
                      ns: 'subscription.subscription-plan-gateway',
                    }),
                    variant: 'default',
                    handler: () => {
                      openCreateSubscriptionPlanGateway()
                    },
                    show: 'none',
                  },
                ]}
              />
            ),
          },
          {
            title: t('subscription_person', { ns: 'modules' }),
            children: (
              <DataPanel
                ref={subscriptionPersonRef}
                selectable
                multiple
                layout='list'
                id={`subscription-person-${item?.id}`}
                url={`/subscription/${item?.id}/subscription-person`}
                render={(item: SubscriptionPerson) => (
                  <div className='flex flex-row gap-2'>
                    <span className='relative px-[0.3rem] py-[0.2rem] text-sm'>
                      {item.person?.name} - {item.role}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
                    icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
                    label: t('edit', { ns: 'actions' }),
                    tooltip: t('editTooltip', {
                      ns: 'subscription.subscription-person',
                    }),
                    handler: (items: SubscriptionPerson[]) => {
                      if (items.length === 1)
                        openUpdateSubscriptionPerson(items[0])
                    },
                    show: 'once',
                  },
                  {
                    icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
                    label: t('delete', { ns: 'actions' }),
                    tooltip: t('deleteTooltip', {
                      ns: 'subscription.subscription-person',
                    }),
                    variant: 'destructive',
                    handler: (items: SubscriptionPerson[]) => {
                      openDeleteSubscriptionPerson(items)
                    },
                    show: 'some',
                  },
                  {
                    icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
                    label: t('create', { ns: 'actions' }),
                    tooltip: t('createTooltip', {
                      ns: 'subscription.subscription-person',
                    }),
                    variant: 'default',
                    handler: () => {
                      openCreateSubscriptionPerson()
                    },
                    show: 'none',
                  },
                ]}
              />
            ),
          },
          {
            title: t('subscription_payment', { ns: 'modules' }),
            children: (
              <DataPanel
                ref={subscriptionPaymentRef}
                selectable
                multiple
                layout='list'
                id={`subscription-payment-${item?.id}`}
                url={`/subscription/${item?.id}/subscription-payment`}
                render={(item: SubscriptionPayment) => (
                  <TooltipProvider>
                    <div className='flex flex-row items-center'>
                      <Tooltip>
                        <TooltipTrigger>
                          <IconCalendar className='mr-2' />
                        </TooltipTrigger>
                        <TooltipContent>Início</TooltipContent>
                      </Tooltip>
                      <span className='text-sm font-semibold'>
                        {item.start_at
                          ? formatDate(String(item.start_at))
                          : 'Não definido'}
                      </span>
                      -
                      <span className='text-sm font-semibold'>
                        {item.end_at
                          ? formatDate(String(item.end_at))
                          : 'Indeterminado'}
                      </span>
                    </div>
                  </TooltipProvider>
                )}
                menuActions={[
                  {
                    icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
                    label: t('edit', { ns: 'actions' }),
                    tooltip: t('editTooltip', {
                      ns: 'subscription.subscription-payment',
                    }),
                    handler: (items: SubscriptionPayment[]) => {
                      if (items.length === 1)
                        openUpdateSubscriptionPayment(items[0])
                    },
                    show: 'once',
                  },
                  {
                    icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
                    label: t('delete', { ns: 'actions' }),
                    tooltip: t('deleteTooltip', {
                      ns: 'subscription.subscription-payment',
                    }),
                    variant: 'destructive',
                    handler: (items: SubscriptionPayment[]) => {
                      openDeleteSubscriptionPayment(items)
                    },
                    show: 'some',
                  },
                  {
                    icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
                    label: t('create', { ns: 'actions' }),
                    tooltip: t('createTooltip', {
                      ns: 'subscription.subscription-payment',
                    }),
                    variant: 'default',
                    handler: () => {
                      openCreateSubscriptionPayment()
                    },
                    show: 'none',
                  },
                ]}
              />
            ),
          },
        ]}
      />
    )
  }
)

SubscriptionUpdatePanel.displayName = 'SubscriptionUpdatePanel'

export default SubscriptionUpdatePanel
