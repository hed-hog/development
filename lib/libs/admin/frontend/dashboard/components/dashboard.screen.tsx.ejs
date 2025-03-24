import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useDashboardDelete } from '@/features/dashboard/dashboard'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { Dashboard } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DashboardCreatePanel from './components/dashboard-create-panel'
import DashboardUpdatePanel from './components/dashboard-update-panel'
import DashboardCard from '@/components/cards/dashboard-card'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Dashboard[]>([])
  const { mutate: deleteDashboard } = useDashboardDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'dashboard.dashboard',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'dashboard.dashboard' }),
      description: t('createText', { ns: 'dashboard.dashboard' }),
      children: () => <DashboardCreatePanel onCreated={() => closeSheet(id)} />,
    })

    return id
  }

  const openDelete = (items: Dashboard[]) => {
    return confirm({
      title: `${t('delete', { ns: 'dashboard.dashboard' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'dashboard.dashboard' }),
    })
      .then(() =>
        deleteDashboard(
          items
            .map((item) => (item as any).dashboard_id)
            .filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: Dashboard) => {
    const id = openSheet({
      children: () => (
        <DashboardUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'dashboard.dashboard' }),
      description: t('editText', { ns: 'dashboard.dashboard' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('dashboard', { ns: 'modules' })} />
      <DataPanel
        url='/dashboard'
        layout='grid'
        id='dashboard'
        selectable
        render={(item: Dashboard) => <DashboardCard item={item} />}
        responsiveColumns={{
          default: 1,
          sm: 2,
          md: 1,
          lg: 2,
          xl: 3,
        }}
        selected={selectedItems as Dashboard[]}
        multiple
        hasSearch
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'contact.dashboard' }),
            handler: (items: Dashboard[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'contact.dashboard' }),
            variant: 'destructive',
            handler: (items: Dashboard[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'contact.dashboard' }),
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
