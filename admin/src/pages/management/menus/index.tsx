import { DataPanel } from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateMenu,
  useDeleteMenu,
  useEditMenu,
  useEditMenuRoles,
  useEditMenuScreens,
} from '@/features/menus/api'
import { useApp } from '@/hooks/use-app'
import { getIcon } from '@/lib/get-icon'
import { queryClient } from '@/lib/query-provider'
import { MenuType } from '@/types/menu'
import { RoleType } from '@/types/role'
import { ScreenType } from '@/types/screen'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t: modulesT } = useTranslation('modules')
  const { t: actionsT } = useTranslation('actions')
  const { t: menuT } = useTranslation('menus')

  const [selectedItems, setSelectedItems] = useState<
    (MenuType | RoleType | ScreenType)[]
  >([])
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
  const { mutate: editMenuRoles } = useEditMenuRoles()
  const { mutate: editMenuScreens } = useEditMenuScreens()

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

  const openDeleteDialog = (items: MenuType[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: MenuType) => (
            <div key={item.name} className='mb-5 flex flex-col'>
              <div className='flex flex-row items-center'>
                <h3 className='text-md font-semibold'>{item.name}</h3>
                <span className='ml-2 inline'>{getIcon(item.icon)}</span>
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

  const openEditDialog = (item: MenuType) => {
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
                  onSubmit={(data: MenuType) => {
                    editMenu({ id: String(data.id), data })
                    closeDialog(id)
                  }}
                />
              ),
            },
            {
              title: modulesT('roles'),
              children: (
                <DataPanel<RoleType>
                  ref={menuRolesRef}
                  selectable
                  multiple
                  layout='list'
                  id={`menu-roles-${item.id}`}
                  url={`/menus/${item.id}/roles`}
                  checked={(item: RoleType) => {
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
                    if (menuRolesRef.current) {
                      const items = menuRolesRef.current.getSelectedItems()

                      if (items) {
                        editMenuRoles(
                          {
                            menuId: String(item.id),
                            roleIds: items.map((r: RoleType) => r.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`menu-roles-${item.id}`],
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
                  url={`/menus/${item.id}/screens`}
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
                    return Boolean((item.menu_screens ?? []).length)
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
                            screenIds: items.map((s: ScreenType) => s.id),
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
        <title>{modulesT('menus')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {modulesT('menus')}
          </h1>
        </div>
      </div>

      <DataPanel
        url='/menus'
        layout='table'
        id='menus'
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
                {getIcon(item.icon)} {`${item.icon}`}
              </div>
            ),
          },
        ]}
        selected={selectedItems as MenuType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: menuT('editTooltip'),
            handler: (items: MenuType[]) => {
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
