import { DataPanel } from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateRole,
  useDeleteRole,
  useEditRole,
  useEditRoleMenus,
  useEditRoleRoutes,
  useEditRoleScreens,
  useEditRoleUsers,
} from '@/features/roles/api'
import { useApp } from '@/hooks/use-app'
import { getIcon } from '@/lib/get-icon'
import { queryClient } from '@/lib/query-provider'
import { MenuType } from '@/types/menu'
import { RoleType } from '@/types/role'
import { RouteType } from '@/types/route'
import { ScreenType } from '@/types/screen'
import { UserType } from '@/types/user'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t: modulesT } = useTranslation('modules')
  const { t: actionsT } = useTranslation('actions')
  const { t: rolesT } = useTranslation('roles')

  const [selectedItems, setSelectedItems] = useState<
    (RoleType | RouteType | MenuType | ScreenType)[]
  >([])
  const formEdit = useRef<any>(null)
  const roleScreensRef = useRef<any>(null)
  const roleMenusRef = useRef<any>(null)
  const roleRoutesRef = useRef<any>(null)
  const roleUsersRef = useRef<any>(null)

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
      description: '',
    },
    mode: 'onChange',
  })

  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()
  const { mutate: editRoleRoutes } = useEditRoleRoutes()
  const { mutate: editRoleScreens } = useEditRoleScreens()
  const { mutate: editRoleUsers } = useEditRoleUsers()
  const { mutate: editRoleMenus } = useEditRoleMenus()
  const { mutate: deleteRoles } = useDeleteRole()
  const { mutate: createRole } = useCreateRole()
  const { mutate: editRole } = useEditRole()

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
          onSubmit={(data: RoleType) => {
            createRole(data)
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: RoleType[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: RoleType) => (
            <div key={item.name} className='mb-5'>
              <h3 className='text-md font-semibold'>{item.name}</h3>
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

  const openEditDialog = (item: RoleType) => {
    form.reset({
      id: item.id || '',
      name: item.name || '',
      description: item.description || '',
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
                      label: { text: rolesT('name') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'description',
                      label: { text: rolesT('description') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: RoleType) => {
                    editRole({ id: String(data.id), data })
                    closeSheet(id)
                  }}
                />
              ),
            },
            {
              title: modulesT('users'),
              children: (
                <DataPanel
                  ref={roleUsersRef}
                  selectable
                  extractKey={(item) => String(item.id)}
                  multiple
                  layout='list'
                  id={`role-users-${item.id}`}
                  url={`/roles/${item.id}/users`}
                  checked={(item: RoleType) => {
                    return Boolean((item.role_users ?? []).length)
                  }}
                  onSelectionChange={(selectedItems) => {
                    setSelectedItems((prev) => [...prev, ...selectedItems])
                  }}
                />
              ),
              buttons: [
                {
                  text: actionsT('apply'),
                  variant: 'default',
                  onClick: () => {
                    if (roleUsersRef.current) {
                      const items = roleUsersRef.current.getSelectedItems()

                      if (items) {
                        editRoleUsers(
                          {
                            roleId: String(item.id),
                            userIds: items.map((u: UserType) => u.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`role-users-${item.id}`],
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
            {
              title: modulesT('routes'),
              children: (
                <DataPanel
                  ref={roleRoutesRef}
                  selectable
                  multiple
                  layout='list'
                  id={`role-routes-${item.id}`}
                  url={`/roles/${item.id}/routes`}
                  render={(item: RouteType) => (
                    <div className='flex flex-row gap-2'>
                      <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                        {item.method}
                      </code>
                      <code>{item.url}</code>
                    </div>
                  )}
                  checked={(item: RouteType) => {
                    return Boolean((item.role_routes ?? []).length)
                  }}
                  onSelectionChange={(selectedItems) => {
                    setSelectedItems((prev) => [...prev, ...selectedItems])
                  }}
                />
              ),
              buttons: [
                {
                  text: actionsT('apply'),
                  variant: 'default',
                  onClick: () => {
                    if (roleRoutesRef.current) {
                      const items = roleRoutesRef.current.getSelectedItems()

                      if (items) {
                        editRoleRoutes(
                          {
                            roleId: String(item.id),
                            routeIds: items.map((r: RouteType) => r.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`role-routes-${item.id}`],
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
            {
              title: modulesT('menus'),
              children: (
                <DataPanel
                  ref={roleMenusRef}
                  selectable
                  multiple
                  layout='list'
                  id={`role-menus-${item.id}`}
                  url={`/roles/${item.id}/menus`}
                  render={(item: MenuType) => (
                    <div className='flex flex-row items-center gap-2'>
                      {getIcon(item.icon || '')}
                      <code>
                        {item.name} - {item.url}
                      </code>
                    </div>
                  )}
                  checked={(item: MenuType) => {
                    return Boolean((item.role_menus ?? []).length)
                  }}
                  onSelectionChange={(selectedItems) => {
                    setSelectedItems((prev) => [...prev, ...selectedItems])
                  }}
                />
              ),
              buttons: [
                {
                  text: actionsT('apply'),
                  variant: 'default',
                  onClick: () => {
                    if (roleMenusRef.current) {
                      const items = roleMenusRef.current.getSelectedItems()

                      if (items) {
                        editRoleMenus(
                          {
                            roleId: String(item.id),
                            menuIds: items.map((m: MenuType) => m.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`role-menus-${item.id}`],
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
            {
              title: modulesT('screens'),
              children: (
                <DataPanel
                  ref={roleScreensRef}
                  selectable
                  multiple
                  layout='list'
                  id={`role-screens-${item.id}`}
                  url={`/roles/${item.id}/screens`}
                  render={(item: ScreenType) => (
                    <div className='flex flex-col'>
                      <div className='flex flex-row'>
                        {getIcon(item.icon || '')}
                        <code className='px-1'>
                          {item.name} - {item.slug}
                        </code>
                      </div>
                      <p className='m-0 text-left text-xs'>
                        {item.description}
                      </p>
                    </div>
                  )}
                  checked={(item: ScreenType) => {
                    return Boolean((item.role_screens ?? []).length)
                  }}
                  onSelectionChange={(selectedItems) => {
                    setSelectedItems((prev) => [...prev, ...selectedItems])
                  }}
                />
              ),
              buttons: [
                {
                  text: actionsT('apply'),
                  variant: 'default',
                  onClick: () => {
                    if (roleScreensRef.current) {
                      const items = roleScreensRef.current.getSelectedItems()

                      if (items) {
                        editRoleScreens(
                          {
                            roleId: String(item.id),
                            screenIds: items.map((s: ScreenType) => s.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`role-screens-${item.id}`],
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
      title: rolesT('edit'),
      description: rolesT('editText'),
    })

    return id
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
        selected={selectedItems as RoleType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: rolesT('editTooltip'),
            handler: (items: RoleType[]) => {
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
