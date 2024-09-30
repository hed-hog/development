import DataPanel from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateRoute,
  useDeleteRoute,
  useEditRoute,
  useEditRouteRoles,
  useEditRouteScreens,
} from '@/features/routes/api'
import { useApp } from '@/hooks/use-app'
import { getIcon } from '@/lib/get-icon'
import { queryClient } from '@/lib/query-provider'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const formEdit = useRef<any>(null)
  const routeScreensRef = useRef<any>(null)
  const routeRolesRef = useRef<any>(null)

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      url: '',
      method: '',
    },
    mode: 'onChange',
  })

  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()

  const { mutate: deleteRoutes } = useDeleteRoute()
  const { mutate: createRoute } = useCreateRoute()
  const { mutate: editRoute } = useEditRoute()
  const { mutate: editRouteScreens } = useEditRouteScreens()
  const { mutate: editRouteRoles } = useEditRouteRoles()

  const openCreateDialog = () => {
    form.reset({
      id: '',
      url: '',
      method: '',
    })

    const id = openDialog({
      title: 'Criar Rota',
      description: 'Preencha as informações da rota.',
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'url',
              label: { text: 'URL' },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'method',
              label: { text: 'Método' },
              type: EnumFieldType.TEXT,
              required: true,
            },
          ]}
          form={form}
          button={{ text: 'Criar' }}
          onSubmit={(data) => {
            createRoute(data)
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
            <div key={item.url} className='mb-5'>
              <h3 className='text-md font-semibold'>{item.url}</h3>
              <p className='text-xs'>{item.method}</p>
            </div>
          ))}
        </div>
      ),
      title: 'Excluir Rota',
      description: 'Tem certeza de que deseja deletar estas rotas?',
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
            deleteRoutes(items.map((item) => item.id))
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
      url: item.url || '',
      method: item.method || '',
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
                  ref={formEdit}
                  fields={[
                    {
                      name: 'url',
                      label: { text: 'URL' },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'method',
                      label: { text: 'Método' },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data) => {
                    editRoute({ id: data.id, data })
                    closeSheet(id)
                  }}
                />
              ),
            },
            {
              title: 'Cargos',
              children: (
                <DataPanel
                  ref={routeRolesRef}
                  selectable
                  multiple
                  layout='list'
                  id={`route-roles-${item.id}`}
                  url={`/routes/${item.id}/roles`}
                  checked={(item: any) => {
                    return (item.role_routes ?? []).length
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
                    if (routeRolesRef.current) {
                      const items = routeRolesRef.current.getSelectedItems()

                      if (items) {
                        editRouteRoles(
                          {
                            routeId: item.id,
                            roleIds: items.map((r: any) => r.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`route-roles-${item.id}`],
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
                  ref={routeScreensRef}
                  selectable
                  multiple
                  layout='list'
                  id={`route-screens-${item.id}`}
                  url={`/routes/${item.id}/screens`}
                  checked={(item: any) => {
                    return (item.route_screens ?? []).length
                  }}
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
                    if (routeScreensRef.current) {
                      const items = routeScreensRef.current.getSelectedItems()

                      if (items) {
                        editRouteScreens(
                          {
                            routeId: item.id,
                            screenIds: items.map((u: any) => u.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`route-screens-${item.id}`],
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
      title: 'Editar Cargo',
      description: 'Visualize e edite as informações dos cargos.',
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>Routes - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Routes</h1>
        </div>
      </div>

      <DataPanel
        url='/routes'
        layout='table'
        id='routes'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'url', header: 'URL' },
          { key: 'method', header: 'Método' },
        ]}
        selected={selectedItems}
        multiple
        hasSearch
        sortable
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: 'Editar',
            tooltip: 'Editar as rotas selecionados',
            handler: (items: any[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: 'Excluir',
            variant: 'destructive',
            tooltip: 'Excluir as rotas selecionados',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: 'Criar',
            variant: 'default',
            tooltip: 'Criar nova rota',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
