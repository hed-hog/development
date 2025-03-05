import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useSubscriptionPlanItemDelete } from '@/features/subscription/subscription-plan-item'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { Item } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SubscriptionPlanItemCreatePanel from './components/subscription-plan-item-create-panel'
import SubscriptionPlanItemUpdatePanel from './components/subscription-plan-item-update-panel'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Item[]>([])
  const { mutate: deleteSubscriptionPlanItem } = useSubscriptionPlanItemDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'subscription.subscription-plan-item',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'subscription.subscription-plan-item' }),
      description: t('createText', {
        ns: 'subscription.subscription-plan-item',
      }),
      children: () => (
        <SubscriptionPlanItemCreatePanel onCreated={() => closeSheet(id)} />
      ),
    })

    return id
  }

  const openDelete = (items: Item[]) => {
    return confirm({
      title: `${t('delete', { ns: 'subscription.subscription-plan-item' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', {
        ns: 'subscription.subscription-plan-item',
      }),
    })
      .then(() =>
        deleteSubscriptionPlanItem(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: Item) => {
    const id = openSheet({
      children: () => (
        <SubscriptionPlanItemUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'subscription.subscription-plan-item' }),
      description: t('editText', { ns: 'subscription.subscription-plan-item' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('subscription_plan_item', { ns: 'modules' })} />
      <DataPanel
        url='/item'
        layout='table'
        id='subscription-plan-item'
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('subscription-plan-item.slug', { ns: 'fields' }),
            isLocale: false,
          },

          {
            key: 'name',
            header: t('subscription-plan-item.name', { ns: 'fields' }),
            isLocale: false,
          },

          {
            key: 'price',
            header: t('subscription-plan-item.price', { ns: 'fields' }),
            isLocale: false,
          },
        ]}
        selected={selectedItems as Item[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', {
              ns: 'subscription.subscription-plan-item',
            }),
            handler: (items: Item[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', {
              ns: 'subscription.subscription-plan-item',
            }),
            variant: 'destructive',
            handler: (items: Item[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', {
              ns: 'subscription.subscription-plan-item',
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
