import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { usePersonTypeDelete } from '@/features/person-type'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { PersonType } from '@/types'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PersonTypeCreatePanel, PersonTypeUpdatePanel } from './components'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonType[]>([])
  const { mutate: deletePersonTypes } = usePersonTypeDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation(['person-types', 'modules', 'actions'])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'actions' }),
      description: t('createText', { ns: 'person-types' }),
      children: () => (
        <PersonTypeCreatePanel onCreated={() => closeSheet(id)} />
      ),
    })

    return id
  }

  const openDelete = (items: PersonType[]) => {
    return confirm({
      title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'person-types' }),
    })
      .then(() =>
        deletePersonTypes(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: PersonType) => {
    const id = openSheet({
      children: () => (
        <PersonTypeUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
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
        selected={selectedItems as PersonType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'person-types' }),
            handler: (items: PersonType[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'person-types' }),
            variant: 'destructive',
            handler: (items: PersonType[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'person-types' }),
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
