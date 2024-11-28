import { PageTitle } from '@/components/custom/page-title'
import { DataPanel } from '@/components/panels/data-panel'
import FormPanel from '@/components/panels/form-panel'
import { TabPanel } from '@/components/panels/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateUser,
  useDeleteUser,
  useEditUser,
  useEditUserRole,
} from '@/features/user'
import { useApp } from '@/hooks/use-app'
import { queryClient } from '@/lib/query-provider'
import { Role, User } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const userRolesRef = useRef<any>(null)
  const formEdit = useRef<any>(null)

  const form = useForm<FieldValues>({})

  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()
  const { mutate: deleteUsers } = useDeleteUser()
  const { mutate: createUser } = useCreateUser()
  const { mutate: editUser } = useEditUser()
  const { mutate: editUserRoles } = useEditUserRole()

  const { t: userT } = useTranslation('user')
  const { t: actionsT } = useTranslation('actions')
  const { t: modulesT } = useTranslation('modules')

  const openCreateDialog = () => {
    const id = openDialog({
      title: userT('create'),
      description: userT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: userT('name') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'email',
              label: { text: userT('email') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'password',
              label: { text: userT('password') },
              type: EnumFieldType.PASSWORD,
              required: true,
            },
          ]}
          form={form}
          button={{ text: actionsT('create') }}
          onSubmit={(data: User) => {
            createUser(data)
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: User[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: User) => (
            <div key={item.email} className='mb-5'>
              <h3 className='text-md font-semibold'>{item.name}</h3>
              <p className='text-xs'>{item.email}</p>
            </div>
          ))}
        </div>
      ),
      title: userT('delete'),
      description: userT('deleteText'),
      buttons: [
        {
          variant: 'secondary',
          name: 'cancel',
          text: actionsT('cancel'),
          onClick: () => {
            closeDialog(id)
          },
        },
        {
          text: actionsT('delete'),
          name: 'delete',
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

  const openEditDialog = (item: User) => {
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
                  name: 'save',
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
                      label: { text: userT('name') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'email',
                      label: { text: userT('email') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: User) => {
                    editUser({ id: String(data.id), data })
                    closeSheet(id)
                  }}
                />
              ),
            },
            {
              title: modulesT('role'),
              children: (
                <DataPanel
                  ref={userRolesRef}
                  selectable
                  checked={(item: Role) => (item.role_user ?? []).length > 0}
                  multiple
                  layout='list'
                  id={`user-role-${item.id}`}
                  url={`/user/${item.id}/role`}
                />
              ),
              buttons: [
                {
                  text: actionsT('apply'),
                  name: 'save',
                  variant: 'default',
                  onClick: () => {
                    if (userRolesRef.current) {
                      const items = userRolesRef.current?.getSelectedItems()

                      if (items) {
                        editUserRoles(
                          {
                            userId: String(item.id),
                            roleIds: items.map((r: Role) => r.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`user-role-${item.id}`],
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
      title: userT('edit'),
      description: userT('editText'),
    })

    return id
  }

  return (
    <>
      <PageTitle title={modulesT('user')} />

      <DataPanel
        url='/user'
        layout='table'
        id='user'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: userT('name') },
          { key: 'email', header: userT('email') },
        ]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: userT('editTooltip'),
            handler: (items: User[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('delete'),
            variant: 'destructive',
            tooltip: userT('deleteTooltip'),
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            variant: 'default',
            tooltip: userT('createTooltip'),
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
