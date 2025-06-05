import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useDashboardComponentDelete } from '@/features/admin/dashboard-component'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { DashboardComponent } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DashboardComponentCreatePanel from './components/dashboard-component-create-panel'
import DashboardComponentUpdatePanel from './components/dashboard-component-update-panel'
import DashboardComponentCard from '@/components/cards/dashboard-component-card'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<DashboardComponent[]>([])
  const { mutate: deleteDashboardComponent } = useDashboardComponentDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'dashboard.dashboard-component',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'dashboard.dashboard-component' }),
      description: t('createText', {
        ns: 'dashboard.dashboard-component',
      }),
      children: () => (
        <DashboardComponentCreatePanel onCreated={() => closeSheet(id)} />
      ),
    })

    return id
  }

  const openDelete = (items: DashboardComponent[]) => {
    return confirm({
      title: `${t('delete', { ns: 'dashboard.dashboard-component' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', {
        ns: 'dashboard.dashboard-component',
      }),
    })
      .then(() =>
        deleteDashboardComponent(
          items
            .map((item) => (item as any).component_id)
            .filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: DashboardComponent) => {
    const id = openSheet({
      children: () => (
        <DashboardComponentUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'dashboard.dashboard-component' }),
      description: t('editText', {
        ns: 'dashboard.dashboard-component',
      }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('dashboard_component', { ns: 'modules' })} />
      <DataPanel
        url='/dashboard-component'
        layout='grid'
        id='dashboard-component'
        selectable
        render={(item: DashboardComponent) => (
          <DashboardComponentCard item={item} />
        )}
        responsiveColumns={{
          default: 1,
          sm: 2,
          md: 1,
          lg: 2,
          xl: 3,
        }}
        selected={selectedItems as DashboardComponent[]}
        multiple
        hasSearch
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', {
              ns: 'dashboard.dashboard-component',
            }),
            handler: (items: DashboardComponent[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', {
              ns: 'dashboard.dashboard-component',
            }),
            variant: 'destructive',
            handler: (items: DashboardComponent[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', {
              ns: 'dashboard.dashboard-component',
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
