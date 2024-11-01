import { DataPanel } from '@/components/panels/data-panel'
import FormPanel from '@/components/panels/form-panel'
import { TabPanel } from '@/components/panels/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateMenu,
  useDeleteMenu,
  useEditMenu,
  useEditMenuRole,
  useEditMenuScreen,
} from '@/features/menu/api'
import { useApp } from '@/hooks/use-app'
import { getIcon } from '@/lib/get-icon'
import { queryClient } from '@/lib/query-provider'
import { Menu, Role, Screen } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t: modulesT } = useTranslation('modules')
  const { t: actionsT } = useTranslation('actions')
  const { t: menuT } = useTranslation('menu')

  const [selectedItems, setSelectedItems] = useState<(Menu | Role | Screen)[]>(
    []
  )
  const formEdit = useRef<any>(null)
  const menuRolesRef = useRef<any>(null)
  const menuScreensRef = useRef<any>(null)

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
      url: '',
      icon: '',
    },
    mode: 'onChange',
  })

  const { openDialog, closeDialog, openSheet } = useApp()
  const { mutate: deleteMenu } = useDeleteMenu()
  const { mutate: createMenu } = useCreateMenu()
  const { mutate: editMenu } = useEditMenu()
  const { mutate: editMenuRoles } = useEditMenuRole()
  const { mutate: editMenuScreens } = useEditMenuScreen()

  const openCreateDialog = () => {
    form.reset({
      id: '',
      name: '',
      slug: '',
      description: '',
    })

    const id = openDialog({
      title: menuT('create'),
      description: menuT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: menuT('name') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'url',
              label: { text: menuT('url') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'icon',
              label: { text: menuT('icon') },
              type: EnumFieldType.TEXT,
              required: true,
            },
          ]}
          form={form}
          button={{ text: actionsT('create') }}
          onSubmit={(data) => {
            createMenu(data)
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: Menu[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: Menu) => (
            <div key={item.name} className='mb-5 flex flex-col'>
              <div className='flex flex-row items-center'>
                <h3 className='text-md font-semibold'>{item.name}</h3>
                {item.icon && (
                  <span className='ml-2 inline'>{getIcon(item.icon)}</span>
                )}
              </div>
              <p className='text-xs'>
                <b>{menuT('url')}:</b> {item.url}
              </p>
            </div>
          ))}
        </div>
      ),
      title: menuT('delete'),
      description: menuT('deleteText'),
      buttons: [
        {
          variant: 'secondary',
          text: actionsT('cancel'),
          onClick: () => {
            setSelectedItems(items)
            closeDialog(id)
          },
        },
        {
          text: actionsT('delete'),
          variant: 'destructive',
          onClick: () => {
            deleteMenu(items.map((item) => item.id))
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

  const openEditDialog = (item: Menu) => {
    form.reset({
      id: item.id || '',
      name: item.name || '',
      url: item.url || '',
      icon: item.icon || '',
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
                  fields={[
                    {
                      name: 'name',
                      label: { text: menuT('name') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'url',
                      label: { text: menuT('url') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'icon',
                      label: { text: menuT('icon') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: Menu) => {
                    editMenu({ id: String(data.id), data })
                    closeDialog(id)
                  }}
                />
              ),
            },
            {
              title: modulesT('role'),
              children: (
                <DataPanel<Role>
                  ref={menuRolesRef}
                  selectable
                  multiple
                  layout='list'
                  id={`menu-role-${item.id}`}
                  url={`/menu/${item.id}/role`}
                  checked={(item: Role) => {
                    return Boolean((item.role_menu ?? []).length)
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
                    if (menuRolesRef.current) {
                      const items = menuRolesRef.current.getSelectedItems()

                      if (items) {
                        editMenuRoles(
                          {
                            menuId: String(item.id),
                            roleIds: items.map((r: Role) => r.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`menu-role-${item.id}`],
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
                  ref={menuScreensRef}
                  selectable
                  multiple
                  layout='list'
                  id={`menu-screens-${item.id}`}
                  url={`/menu/${item.id}/screen`}
                  render={(item: Screen) => (
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
                  checked={(item: Screen) => {
                    return Boolean((item.menu_screen ?? []).length)
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
                    if (menuScreensRef.current) {
                      const items = menuScreensRef.current.getSelectedItems()

                      if (items) {
                        editMenuScreens(
                          {
                            menuId: String(item.id),
                            screenIds: items.map((s: Screen) => s.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`menu-screens-${item.id}`],
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
      title: menuT('edit'),
      description: menuT('editText'),
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>{modulesT('menu')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {modulesT('menu')}
          </h1>
        </div>
      </div>

      <DataPanel
        url='/menu'
        layout='table'
        id='menu'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: menuT('name') },
          { key: 'url', header: menuT('url') },
          {
            key: 'icon',
            header: menuT('icon'),
            render: (item) => (
              <div className='flex flex-row gap-2'>
                {item.icon && getIcon(item.icon)} {`${item.icon}`}
              </div>
            ),
          },
        ]}
        selected={selectedItems as Menu[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: menuT('editTooltip'),
            handler: (items: Menu[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('delete'),
            variant: 'destructive',
            tooltip: menuT('deleteTooltip'),
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            variant: 'default',
            tooltip: menuT('createTooltip'),
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
