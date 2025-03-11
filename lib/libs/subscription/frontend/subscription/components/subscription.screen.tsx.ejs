import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useSubscriptionDelete } from '@/features/subscription/subscription'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { Subscription } from '@/types/models'
import {
  IconCalendar,
  IconCash,
  IconEdit,
  IconPin,
  IconPlus,
  IconShoppingCart,
  IconTrash,
  IconUser,
} from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SubscriptionCreatePanel from './components/subscription-create-panel'
import SubscriptionUpdatePanel from './components/subscription-update-panel'
import { formatDate } from '@/lib/date-string'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Subscription[]>([])
  const { mutate: deleteSubscription } = useSubscriptionDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'subscription.subscription',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'subscription.subscription' }),
      description: t('createText', { ns: 'subscription.subscription' }),
      children: () => (
        <SubscriptionCreatePanel onCreated={() => closeSheet(id)} />
      ),
    })

    return id
  }

  const openDelete = (items: Subscription[]) => {
    return confirm({
      title: `${t('delete', { ns: 'subscription.subscription' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'subscription.subscription' }),
    })
      .then(() =>
        deleteSubscription(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: Subscription) => {
    const id = openSheet({
      children: () => (
        <SubscriptionUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'subscription.subscription' }),
      description: t('editText', { ns: 'subscription.subscription' }),
    })

    return id
  }

  const statusMap: Record<string, string> = {
    active: 'Ativo',
    expired: 'Expirado',
    canceled: 'Cancelado',
  }

  return (
    <>
      <PageTitle title={t('subscription', { ns: 'modules' })} />
      <DataPanel
        url='/subscription'
        layout='grid'
        id='subscription'
        selectable
        selected={selectedItems as Subscription[]}
        multiple
        hasSearch
        responsiveColumns={{
          default: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 4,
        }}
        render={(item: Subscription) => (
          <TooltipProvider delayDuration={0}>
            <div className='relative overflow-hidden'>
              <div className='grid gap-2'>
                <div className='flex flex-row items-center'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <IconUser className='mr-2' />
                    </TooltipTrigger>
                    <TooltipContent>Pessoa</TooltipContent>
                  </Tooltip>
                  <div className='flex flex-col'>
                    {item.subscription_person?.length ? (
                      item.subscription_person.map((p) => (
                        <p key={p.id} className='text-sm font-semibold'>
                          {p.person_name}
                        </p>
                      ))
                    ) : (
                      <p className='text-sm font-semibold'>
                        Nenhuma pessoa vinculada
                      </p>
                    )}
                  </div>
                </div>

                <div className='flex flex-row items-center'>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconPin className='mr-2' />
                    </TooltipTrigger>
                    <TooltipContent>Status</TooltipContent>
                  </Tooltip>
                  <span className='text-sm capitalize'>
                    {statusMap[item.status]}
                  </span>
                </div>

                <div className='flex flex-row items-center'>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconShoppingCart className='mr-2' />
                    </TooltipTrigger>
                    <TooltipContent>Produto</TooltipContent>
                  </Tooltip>
                  <span className='text-sm'>
                    {item.subscription_plan?.item?.name || 'Desconhecido'}
                  </span>
                </div>

                <div className='flex flex-row items-center'>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconCalendar className='mr-2' />
                    </TooltipTrigger>
                    <TooltipContent>Duração</TooltipContent>
                  </Tooltip>
                  <span className='text-sm'>
                    {item.subscription_payment?.start_at
                      ? formatDate(String(item.subscription_payment?.start_at))
                      : 'Não definido'}
                  </span>
                  -
                  <span className='text-sm'>
                    {item.subscription_payment?.end_at
                      ? formatDate(String(item.subscription_payment?.end_at))
                      : 'Indeterminado'}
                  </span>
                </div>

                <div className='flex flex-row items-center'>
                  <Tooltip>
                    <TooltipTrigger>
                      <IconCash className='mr-2' />
                    </TooltipTrigger>
                    <TooltipContent>Preço</TooltipContent>
                  </Tooltip>
                  <span className='text-sm'>
                    R$
                    {Number(item.subscription_payment?.payment?.amount ?? 0) -
                      Number(item.subscription_payment?.payment?.discount ?? 0)}
                    ,00 - {item.subscription_payment?.method_name}
                  </span>
                </div>
              </div>
            </div>
          </TooltipProvider>
        )}
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'subscription.subscription' }),
            handler: (items: Subscription[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'subscription.subscription' }),
            variant: 'destructive',
            handler: (items: Subscription[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'subscription.subscription' }),
            variant: 'default',
            handler: () => {
              openCreate()
            },
            show: 'none',
          },
        ]}
      />
    </>
  )
}
