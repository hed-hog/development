import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useDashboardUserDelete } from '@/features/dashboard/dashboard-user'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { DashboardUser } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DashboardUserCreatePanel from './components/dashboard-user-create-panel'
import DashboardUserUpdatePanel from './components/dashboard-user-update-panel'
import DashboardUserCard from '@/components/cards/dashboard-user-card'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<DashboardUser[]>([])
  const { mutate: deleteDashboardUser } = useDashboardUserDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'dashboard.dashboard-user',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'dashboard.dashboard-user' }),
      description: t('createText', {
        ns: 'dashboard.dashboard-user',
      }),
      children: () => (
        <DashboardUserCreatePanel onCreated={() => closeSheet(id)} />
      ),
    })

    return id
  }

  const openDelete = (items: DashboardUser[]) => {
    return confirm({
      title: `${t('delete', { ns: 'dashboard.dashboard-user' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', {
        ns: 'dashboard.dashboard-user',
      }),
    })
      .then(() =>
        deleteDashboardUser(
          items
            .map((item) => (item as any).component_id)
            .filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: DashboardUser) => {
    const id = openSheet({
      children: () => (
        <DashboardUserUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'dashboard.dashboard-user' }),
      description: t('editText', {
        ns: 'dashboard.dashboard-user',
      }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('dashboard_user', { ns: 'modules' })} />
      <DataPanel
        url='/dashboard-user'
        layout='grid'
        id='dashboard-user'
        selectable
        render={(item: DashboardUser) => <DashboardUserCard item={item} />}
        responsiveColumns={{
          default: 1,
          sm: 2,
          md: 1,
          lg: 2,
          xl: 3,
        }}
        selected={selectedItems as DashboardUser[]}
        multiple
        hasSearch
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'dashboard.dashboard-user' }),
            handler: (items: DashboardUser[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', {
              ns: 'dashboard.dashboard-user',
            }),
            variant: 'destructive',
            handler: (items: DashboardUser[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', {
              ns: 'dashboard.dashboard-user',
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
