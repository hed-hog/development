import DataPanel from '@/components/custom/data-panel'
import { PageTitle } from '@/components/custom/page-title'
import { useDeletePersonType } from '@/features/person-type'
import { useApp } from '@/hooks/use-app'
import { Person } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PersonTypeCreatePanel } from './components/person-type-create-panel'
import { PersonTypeUpdatePanel } from './components/person-type-update-panel'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Person[]>([])

  const { mutate: deletePersonTypes } = useDeletePersonType()
  const { openDialog, closeDialog, openSheet, confirm } = useApp()

  const { t } = useTranslation(['person-types', 'modules', 'actions'])

  const openCreateDialog = () => {
    const id = openDialog({
      title: t('create', { ns: 'actions' }),
      description: t('createText', { ns: 'person-types' }),
      children: () => (
        <PersonTypeCreatePanel onCreated={() => closeDialog(id)} />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: Person[]) => {
    return confirm({
      title: t('delete', { ns: 'person-types' }),
      description: t('deleteText', { ns: 'person-types' }),
    })
      .then(() => deletePersonTypes(items.map((item) => item.id)))
      .catch(() => setSelectedItems(items))
  }

  const openEditDialog = (item: Person) => {
    const id = openSheet({
      children: () => (
        <PersonTypeUpdatePanel onUpdated={() => closeDialog(id)} />
      ),
      title: t('edit', { ns: 'person-types' }),
      description: t('editText', { ns: 'person-types' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('personTypes', { ns: 'modules' })} />
      <DataPanel
        url='/person-type'
        layout='table'
        id='person-type'
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64 },
          { key: 'name', header: t('name', { ns: 'person-types' }) },
        ]}
        selected={selectedItems as Person[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'person-types' }),
            handler: (items: Person[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'person-types' }),
            variant: 'destructive',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'person-types' }),
            variant: 'default',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
