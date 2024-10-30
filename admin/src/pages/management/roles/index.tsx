import { DataPanel } from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { RoleEditPanel } from '@/components/custom/role-edit-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useCreateRole, useDeleteRole } from '@/features/roles/api'
import { useApp } from '@/hooks/use-app'
import { Menus, Roles, Routes, Screens } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t: modulesT } = useTranslation('modules')
  const { t: actionsT } = useTranslation('actions')
  const { t: rolesT } = useTranslation('roles')

  const [selectedItems, setSelectedItems] = useState<
    (Roles | Routes | Menus | Screens)[]
  >([])

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
      description: '',
    },
    mode: 'onChange',
  })

  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()

  const { mutate: deleteRoles } = useDeleteRole()
  const { mutate: createRole } = useCreateRole()

  const openCreateDialog = () => {
    form.reset({
      id: '',
      name: '',
      description: '',
    })

    const id = openDialog({
      title: rolesT('create'),
      description: rolesT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: rolesT('name') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'description',
              label: { text: rolesT('description') },
              type: EnumFieldType.TEXT,
              required: true,
            },
          ]}
          form={form}
          button={{ text: actionsT('create') }}
          onSubmit={(data: Roles) => {
            createRole(data)
            closeDialog(id)
          }}
        />
      ),
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
      title: rolesT('delete'),
      description: rolesT('deleteText'),
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
      title: rolesT('edit'),
      description: rolesT('editText'),
    })
  }

  return (
    <>
      <Helmet>
        <title>{modulesT('roles')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {modulesT('roles')}
          </h1>
        </div>
      </div>

      <DataPanel
        url='/roles'
        layout='table'
        id='roles'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: rolesT('name') },
          { key: 'description', header: rolesT('description') },
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
            tooltip: rolesT('editTooltip'),
            handler: (items: Roles[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('remove'),
            tooltip: rolesT('deleteTooltip'),
            variant: 'destructive',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            tooltip: rolesT('createTooltip'),
            variant: 'default',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
