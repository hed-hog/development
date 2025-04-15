import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useDashboardItemDelete } from '@/features/admin/dashboard-item'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { DashboardItem } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DashboardItemCreatePanel from './components/dashboard-item-create-panel'
import DashboardItemUpdatePanel from './components/dashboard-item-update-panel'
import DashboardItemCard from '@/components/cards/dashboard-item-card'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<DashboardItem[]>([])
  const { mutate: deleteDashboarditem } = useDashboardItemDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'dashboard.dashboard-item',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'dashboard.dashboard-item' }),
      description: t('createText', {
        ns: 'dashboard.dashboard-item',
      }),
      children: () => (
        <DashboardItemCreatePanel onCreated={() => closeSheet(id)} />
      ),
    })

    return id
  }

  const openDelete = (items: DashboardItem[]) => {
    return confirm({
      title: `${t('delete', { ns: 'dashboard.dashboard-item' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', {
        ns: 'dashboard.dashboard-item',
      }),
    })
      .then(() =>
        deleteDashboarditem(
          items
            .map((item) => (item as any).item_id)
            .filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: DashboardItem) => {
    const id = openSheet({
      children: () => (
        <DashboardItemUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'dashboard.dashboard-item' }),
      description: t('editText', {
        ns: 'dashboard.dashboard-item',
      }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('dashboard_item', { ns: 'modules' })} />
      <DataPanel
        url='/dashboard-item'
        layout='grid'
        id='dashboard-item'
        selectable
        render={(item: DashboardItem) => <DashboardItemCard item={item} />}
        responsiveColumns={{
          default: 1,
          sm: 2,
          md: 1,
          lg: 2,
          xl: 3,
        }}
        selected={selectedItems as DashboardItem[]}
        multiple
        hasSearch
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', {
              ns: 'dashboard.dashboard-item',
            }),
            handler: (items: DashboardItem[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', {
              ns: 'dashboard.dashboard-item',
            }),
            variant: 'destructive',
            handler: (items: DashboardItem[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', {
              ns: 'dashboard.dashboard-item',
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
