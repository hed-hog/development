import DataPanel from '@/components/panels/data-panel'
import FormPanel from '@/components/panels/form-panel'
import { TabPanel } from '@/components/panels/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateRoute,
  useDeleteRoute,
  useEditRoute,
  useEditRouteRole,
  useEditRouteScreens,
} from '@/features/route/api'
import { useApp } from '@/hooks/use-app'
import { getIcon } from '@/lib/get-icon'
import { queryClient } from '@/lib/query-provider'
import { Role, Route, Screen } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<(Route | Role | Screen)[]>(
    []
  )
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

  const { t: modulesT } = useTranslation('modules')
  const { t: actionsT } = useTranslation('actions')
  const { t: routeT } = useTranslation('route')

  const { mutate: deleteRoutes } = useDeleteRoute()
  const { mutate: createRoute } = useCreateRoute()
  const { mutate: editRoute } = useEditRoute()
  const { mutate: editRouteScreens } = useEditRouteScreens()
  const { mutate: editRouteRoles } = useEditRouteRole()

  const openCreateDialog = () => {
    form.reset({
      id: '',
      url: '',
      method: '',
    })

    const id = openDialog({
      title: routeT('create'),
      description: routeT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'url',
              label: { text: routeT('url') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'method',
              label: { text: routeT('method') },
              type: EnumFieldType.TEXT,
              required: true,
            },
          ]}
          form={form}
          button={{ text: actionsT('create') }}
          onSubmit={(data) => {
            createRoute(data)
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: Route[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: Route) => (
            <div key={item.url} className='mb-5'>
              <h3 className='text-md font-semibold'>{item.url}</h3>
              <p className='text-xs'>{item.method}</p>
            </div>
          ))}
        </div>
      ),
      title: routeT('delete'),
      description: routeT('deleteText'),
      buttons: [
        {
          name: 'cancel',
          variant: 'secondary',
          text: actionsT('cancel'),
          onClick: () => {
            setSelectedItems(items)
            closeDialog(id)
          },
        },
        {
          name: 'delete',
          text: actionsT('delete'),
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

  const openEditDialog = (item: Route) => {
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
              title: actionsT('details'),
              buttons: [
                {
                  name: 'save',
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
                      name: 'url',
                      label: { text: routeT('url') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'method',
                      label: { text: routeT('method') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: Route) => {
                    editRoute({ id: String(data.id), data })
                    closeSheet(id)
                  }}
                />
              ),
            },
            {
              title: modulesT('role'),
              children: (
                <DataPanel
                  ref={routeRolesRef}
                  selectable
                  multiple
                  layout='list'
                  id={`route-role-${item.id}`}
                  url={`/route/${item.id}/role`}
                  checked={(item: Role) => {
                    return Boolean((item.role_route ?? []).length)
                  }}
                  onSelectionChange={(selectedItems) => {
                    setSelectedItems((prev) => [...prev, ...selectedItems])
                  }}
                />
              ),
              buttons: [
                {
                  name: 'save',
                  text: actionsT('apply'),
                  variant: 'default',
                  onClick: () => {
                    if (routeRolesRef.current) {
                      const items = routeRolesRef.current.getSelectedItems()

                      if (items) {
                        editRouteRoles(
                          {
                            routeId: String(item.id),
                            roleIds: items.map((r: Role) => r.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`route-role-${item.id}`],
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
                  ref={routeScreensRef}
                  selectable
                  multiple
                  layout='list'
                  id={`route-screens-${item.id}`}
                  url={`/route/${item.id}/screen`}
                  checked={(item: Screen) => {
                    return Boolean((item.route_screen ?? []).length)
                  }}
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
                  onSelectionChange={(selectedItems) => {
                    setSelectedItems((prev) => [...prev, ...selectedItems])
                  }}
                />
              ),
              buttons: [
                {
                  name: 'save',
                  text: actionsT('apply'),
                  variant: 'default',
                  onClick: () => {
                    if (routeScreensRef.current) {
                      const items = routeScreensRef.current.getSelectedItems()

                      if (items) {
                        editRouteScreens(
                          {
                            routeId: String(item.id),
                            screenIds: items.map((s: Screen) => s.id),
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
      title: routeT('edit'),
      description: routeT('editText'),
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>{modulesT('route')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {modulesT('route')}
          </h1>
        </div>
      </div>

      <DataPanel
        url='/route'
        layout='table'
        id='route'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'url', header: routeT('url') },
          { key: 'method', header: routeT('method') },
        ]}
        selected={selectedItems as Route[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: routeT('editTooltip'),
            handler: (items: Route[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('delete'),
            tooltip: routeT('deleteTooltip'),
            variant: 'destructive',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            tooltip: routeT('createTooltip'),
            variant: 'default',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
