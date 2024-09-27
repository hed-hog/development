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
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [menuId, setMenuId] = useState<string>('')
  const formEdit = useRef<any>(null)
  const menuRolesRef = useRef<any>(null)
  const menuScreensRef = useRef<any>(null)

  useEffect(() => {
    const itemId = menuId.split('-')[1]
    const categoryIds = selectedItems.map((c) => c.id)

    if (menuId && menuId.startsWith('roles')) {
      editMenuRoles({
        menuId: itemId,
        roleIds: categoryIds,
      })
    }

    if (menuId && menuId.startsWith('screens')) {
      editMenuScreens({
        menuId: itemId,
        screenIds: categoryIds,
      })
    }

    setSelectedItems([])
    setMenuId('')
  }, [menuId])

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
      title: 'Criar Menu',
      description: 'Preencha as informações do menu.',
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: 'Nome' },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'url',
              label: { text: 'URL' },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'icon',
              label: { text: 'Ícone' },
              type: EnumFieldType.TEXT,
              required: true,
            },
          ]}
          form={form}
          button={{ text: 'Criar' }}
          onSubmit={(data) => {
            createMenu(data)
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: any[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: any) => (
            <div key={item.name} className='mb-5 flex flex-col'>
              <div className='flex flex-row items-center'>
                <h3 className='text-md font-semibold'>{item.name}</h3>
                <span className='ml-2 inline'>{getIcon(item.icon)}</span>
              </div>
              <p className='text-xs'>
                <b>URL:</b> {item.url}
              </p>
            </div>
          ))}
        </div>
      ),
      title: 'Excluir Menu',
      description: 'Tem certeza de que deseja deletar estes menus?',
      buttons: [
        {
          variant: 'secondary',
          text: 'Cancelar',
          onClick: () => {
            setSelectedItems(items)
            closeDialog(id)
          },
        },
        {
          text: 'Deletar',
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

  const openEditDialog = (item: any) => {
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
              title: 'Detalhes',
              buttons: [
                {
                  text: 'Salvar',
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
                      label: { text: 'Nome' },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'url',
                      label: { text: 'URL' },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'icon',
                      label: { text: 'Ícone' },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data) => {
                    editMenu({ id: data.id, data })
                    closeDialog(id)
                  }}
                />
              ),
            },
            {
              title: 'Funções',
              children: (
                <DataPanel
                  ref={menuRolesRef}
                  selectable
                  multiple
                  layout='list'
                  id={`menu-roles-${item.id}`}
                  url={`/menus/${item.id}/roles`}
                  checked={(item: any) => {
                    return (item.role_menus ?? []).length
                  }}
                  onSelectionChange={(selectedItems) => {
                    setSelectedItems((prev) => [...prev, ...selectedItems])
                  }}
                />
              ),
              buttons: [
                {
                  text: 'Aplicar',
                  variant: 'default',
                  onClick: () => {
                    if (menuRolesRef.current) {
                      const items = menuRolesRef.current.getSelectedItems()

                      if (items) {
                        editMenuRoles(
                          {
                            menuId: item.id,
                            roleIds: items.map((r: any) => r.id),
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
              title: 'Telas',
              children: (
                <DataPanel
                  ref={menuScreensRef}
                  selectable
                  multiple
                  layout='list'
                  id={`menu-screens-${item.id}`}
                  url={`/menus/${item.id}/screens`}
                  render={(item: any) => (
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
                  checked={(item) => {
                    return (item.menu_screens ?? []).length
                  }}
                  onSelectionChange={(selectedItems) => {
                    setSelectedItems((prev) => [...prev, ...selectedItems])
                  }}
                />
              ),
              buttons: [
                {
                  text: 'Aplicar',
                  variant: 'default',
                  onClick: () => {
                    if (menuScreensRef.current) {
                      const items = menuScreensRef.current.getSelectedItems()

                      if (items) {
                        editMenuScreens(
                          {
                            menuId: item.id,
                            screenIds: items.map((s: any) => s.id),
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
      title: 'Editar Menu',
      description: 'Visualize e edite as informações do menu.',
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>Menus - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Menus</h1>
        </div>
      </div>

      <DataPanel
        url='/menus'
        layout='table'
        id='menus'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: 'Name' },
          { key: 'url', header: 'URL' },
          {
            key: 'icon',
            header: 'Ícone',
            render: (item) => (
              <div className='flex flex-row gap-2'>
                {getIcon(item.icon)} {`${item.icon}`}
              </div>
            ),
          },
        ]}
        selected={selectedItems}
        multiple
        hasSearch
        sortable
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: 'Editar',
            tooltip: 'Editar os menus selecionados',
            handler: (items: any[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: 'Excluir',
            variant: 'destructive',
            tooltip: 'Excluir os menus selecionados',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: 'Criar',
            variant: 'default',
            tooltip: 'Criar novo menu',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
