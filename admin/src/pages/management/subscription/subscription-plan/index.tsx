import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useSubscriptionPlanDelete } from '@/features/subscription/subscription-plan'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { SubscriptionPlan } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SubscriptionPlanCreatePanel from './components/subscription-plan-create-panel'
import SubscriptionPlanUpdatePanel from './components/subscription-plan-update-panel'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<SubscriptionPlan[]>([])
  const { mutate: deleteSubscriptionPlan } = useSubscriptionPlanDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'subscription.subscription-plan',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'subscription.subscription-plan' }),
      description: t('createText', { ns: 'subscription.subscription-plan' }),
      children: () => (
        <SubscriptionPlanCreatePanel onCreated={() => closeSheet(id)} />
      ),
    })

    return id
  }

  const openDelete = (items: SubscriptionPlan[]) => {
    return confirm({
      title: `${t('delete', { ns: 'subscription.subscription-plan' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'subscription.subscription-plan' }),
    })
      .then(() =>
        deleteSubscriptionPlan(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: SubscriptionPlan) => {
    const id = openSheet({
      children: () => (
        <SubscriptionPlanUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'subscription.subscription-plan' }),
      description: t('editText', { ns: 'subscription.subscription-plan' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('subscription_plan', { ns: 'modules' })} />
      <DataPanel
        url='/subscription-plan'
        layout='table'
        id='subscription-plan'
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('subscription-plan.slug', { ns: 'fields' }),
            isLocale: false,
          },

          {
            key: 'duration',
            header: t('subscription-plan.duration', { ns: 'fields' }),
            isLocale: false,
          },
        ]}
        selected={selectedItems as SubscriptionPlan[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'subscription.subscription-plan' }),
            handler: (items: SubscriptionPlan[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', {
              ns: 'subscription.subscription-plan',
            }),
            variant: 'destructive',
            handler: (items: SubscriptionPlan[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', {
              ns: 'subscription.subscription-plan',
            }),
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
