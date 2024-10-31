import { DataPanel } from '@/components/custom/data-panel'
import RoleCreatePanel from '@/components/custom/role-create-panel'
import { RoleEditPanel } from '@/components/custom/role-edit-panel'
import { useDeleteRole } from '@/features/role/api'
import { useApp } from '@/hooks/use-app'
import { Menus, Roles, Routes, Screens } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t: modulesT } = useTranslation('modules')
  const { t: actionsT } = useTranslation('actions')
  const { t: roleT } = useTranslation('role')

  const [selectedItems, setSelectedItems] = useState<
    (Roles | Routes | Menus | Screens)[]
  >([])

  const { openDialog, closeDialog, openSheet } = useApp()

  const { mutate: deleteRoles } = useDeleteRole()

  const openCreateDialog = () => {
    console.log('openCreateDialog')

    const id = openDialog({
      title: roleT('create'),
      description: roleT('createText'),
      children: () => <RoleCreatePanel onCreate={() => closeDialog(id)} />,
    })

    return id
  }

  const openDeleteDialog = (items: Roles[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: Roles) => (
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
            deleteRoles(items.map((item) => item.id))
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

  const openEditDialog = (item: Roles) => {
    return openSheet({
      children: () => <RoleEditPanel data={item} />,
      title: roleT('edit'),
      description: roleT('editText'),
    })
  }

  return (
    <>
      <Helmet>
        <title>{modulesT('role')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {modulesT('role')}
          </h1>
        </div>
      </div>

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
        selected={selectedItems as Roles[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: roleT('editTooltip'),
            handler: (items: Roles[]) => {
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
