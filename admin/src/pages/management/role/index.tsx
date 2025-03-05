import { PageTitle } from '@/components/custom/page-title'
import { DataPanel } from '@/components/panels/data-panel'
import { useDeleteRole } from '@/features/role/api'
import { useApp } from '@/hooks/use-app'
import RoleCreatePanel from '@/pages/management/role/components/role-create-panel'
import { RoleEditPanel } from '@/pages/management/role/components/role-edit-panel'
import { Menu, Role, Route, Screen } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t: modulesT } = useTranslation('modules')
  const { t: actionsT } = useTranslation('actions')
  const { t: roleT } = useTranslation('role')

  const [selectedItems, setSelectedItems] = useState<
    (Role | Route | Menu | Screen)[]
  >([])

  const { openDialog, closeDialog, openSheet } = useApp()

  const { mutate: deleteRole } = useDeleteRole()

  const openCreateDialog = () => {
    const id = openDialog({
      title: roleT('create'),
      description: roleT('createText'),
      children: () => <RoleCreatePanel onCreate={() => closeDialog(id)} />,
    })

    return id
  }

  const openDeleteDialog = (items: Role[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: Role) => (
            <div key={item.slug} className='mb-5'>
              <h3 className='text-md font-semibold'>{item.slug}</h3>
              <p className='text-xs'>{item.description}</p>
            </div>
          ))}
        </div>
      ),
      title: roleT('delete'),
      description: roleT('deleteText'),
      buttons: [
        {
          text: actionsT('cancel'),
          variant: 'secondary',
          onClick: () => {
            setSelectedItems(items)
            closeDialog(id)
          },
        },
        {
          text: actionsT('delete'),
          variant: 'destructive',
          onClick: () => {
            deleteRole(items.map((item) => item.id))
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

  const openEditDialog = (item: Role) => {
    return openSheet({
      children: () => <RoleEditPanel data={item} />,
      title: roleT('edit'),
      description: roleT('editText'),
    })
  }

  return (
    <>
      <PageTitle title={modulesT('role')} />

      <DataPanel
        url='/role'
        layout='table'
        id='role'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: roleT('name') },
          { key: 'description', header: roleT('description') },
        ]}
        selected={selectedItems as Role[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: roleT('editTooltip'),
            handler: (items: Role[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('remove'),
            tooltip: roleT('deleteTooltip'),
            variant: 'destructive',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            tooltip: roleT('createTooltip'),
            variant: 'default',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
