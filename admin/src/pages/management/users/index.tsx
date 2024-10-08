import { DataPanel } from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateUser,
  useDeleteUser,
  useEditUser,
  useEditUserRoles,
} from '@/features/users'
import { queryClient } from '@/lib/query-provider'
import { useApp } from '@/hooks/use-app'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'
import { UserType } from '@/types/user'
import { RoleType } from '@/types/role'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const userRolesRef = useRef<any>(null)
  const formEdit = useRef<any>(null)

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
      email: '',
    },
    mode: 'onChange',
  })

  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()
  const { mutate: deleteUsers } = useDeleteUser()
  const { mutate: createUser } = useCreateUser()
  const { mutate: editUser } = useEditUser()
  const { mutate: editUserRoles } = useEditUserRoles()

  const { t: usersT } = useTranslation('users')
  const { t: actionsT } = useTranslation('actions')
  const { t: modulesT } = useTranslation('modules')

  const openCreateDialog = () => {
    form.reset({
      id: '',
      name: '',
      email: '',
      password: '',
    })

    const id = openDialog({
      title: usersT('create'),
      description: usersT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: usersT('name') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'email',
              label: { text: usersT('email') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'password',
              label: { text: usersT('password') },
              type: EnumFieldType.PASSWORD,
              required: true,
            },
          ]}
          form={form}
          button={{ text: actionsT('create') }}
          onSubmit={(data: UserType) => {
            createUser(data)
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: UserType[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: UserType) => (
            <div key={item.email} className='mb-5'>
              <h3 className='text-md font-semibold'>{item.name}</h3>
              <p className='text-xs'>{item.email}</p>
            </div>
          ))}
        </div>
      ),
      title: usersT('delete'),
      description: usersT('deleteText'),
      buttons: [
        {
          variant: 'secondary',
          text: actionsT('cancel'),
          onClick: () => {
            closeDialog(id)
          },
        },
        {
          text: actionsT('delete'),
          variant: 'destructive',
          onClick: () => {
            deleteUsers(items.map((item) => item.id))
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

  const openEditDialog = (item: UserType) => {
    form.reset({
      id: item.id || '',
      name: item.name || '',
      email: item.email || '',
    })

    const id = openSheet({
      children: () => (
        <TabPanel
          activeTabIndex={0}
          tabs={[
            {
              title: actionsT('details'),
              buttons: [
                {
                  text: actionsT('save'),
                  variant: 'default',
                  onClick: () => {
                    formEdit.current?.submit()
                  },
                },
              ],
              children: (
                <FormPanel
                  ref={formEdit}
                  fields={[
                    {
                      name: 'name',
                      label: { text: usersT('name') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'email',
                      label: { text: usersT('email') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: UserType) => {
                    editUser({ id: String(data.id), data })
                    closeSheet(id)
                  }}
                />
              ),
            },
            {
              title: modulesT('roles'),
              children: (
                <DataPanel
                  ref={userRolesRef}
                  selectable
                  checked={(item: RoleType) => item.role_users.length > 0}
                  multiple
                  layout='list'
                  id={`user-roles-${item.id}`}
                  url={`/users/${item.id}/roles`}
                />
              ),
              buttons: [
                {
                  text: actionsT('apply'),
                  variant: 'default',
                  onClick: () => {
                    if (userRolesRef.current) {
                      const items = userRolesRef.current?.getSelectedItems()

                      if (items) {
                        editUserRoles(
                          {
                            userId: String(item.id),
                            roleIds: items.map((r: RoleType) => r.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`user-roles-${item.id}`],
                              })
                            },
                          }
                        )
                      }
                    }
                  },
                },
              ],
            },
          ]}
        />
      ),
      title: usersT('edit'),
      description: usersT('editText'),
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>{modulesT('users')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {modulesT('users')}
          </h1>
        </div>
      </div>
      <DataPanel
        url='/users'
        layout='table'
        id='users'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: usersT('name') },
          { key: 'email', header: usersT('email') },
        ]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: usersT('editTooltip'),
            handler: (items: UserType[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('delete'),
            variant: 'destructive',
            tooltip: usersT('deleteTooltip'),
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            variant: 'default',
            tooltip: usersT('createTooltip'),
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
