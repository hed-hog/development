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
import { RoleType } from '@/types/role'
import { RouteType } from '@/types/route'
import { ScreenType } from '@/types/screen'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<
    (RouteType | RoleType | ScreenType)[]
  >([])
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
  const { t: routesT } = useTranslation('routes')

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
      title: routesT('create'),
      description: routesT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'url',
              label: { text: routesT('url') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'method',
              label: { text: routesT('method') },
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

  const openDeleteDialog = (items: RouteType[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: RouteType) => (
            <div key={item.url} className='mb-5'>
              <h3 className='text-md font-semibold'>{item.url}</h3>
              <p className='text-xs'>{item.method}</p>
            </div>
          ))}
        </div>
      ),
      title: routesT('delete'),
      description: routesT('deleteText'),
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
            deleteRoutes(items.map((item) => item.id))
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

  const openEditDialog = (item: RouteType) => {
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
                      label: { text: routesT('url') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'method',
                      label: { text: routesT('method') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: RouteType) => {
                    editRoute({ id: String(data.id), data })
                    closeSheet(id)
                  }}
                />
              ),
            },
            {
              title: modulesT('roles'),
              children: (
                <DataPanel
                  ref={routeRolesRef}
                  selectable
                  multiple
                  layout='list'
                  id={`route-roles-${item.id}`}
                  url={`/routes/${item.id}/roles`}
                  checked={(item: RoleType) => {
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
                    if (routeRolesRef.current) {
                      const items = routeRolesRef.current.getSelectedItems()

                      if (items) {
                        editRouteRoles(
                          {
                            routeId: String(item.id),
                            roleIds: items.map((r: RoleType) => r.id),
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
              title: modulesT('screens'),
              children: (
                <DataPanel
                  ref={routeScreensRef}
                  selectable
                  multiple
                  layout='list'
                  id={`route-screens-${item.id}`}
                  url={`/routes/${item.id}/screens`}
                  checked={(item: ScreenType) => {
                    return Boolean((item.route_screens ?? []).length)
                  }}
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
                    if (routeScreensRef.current) {
                      const items = routeScreensRef.current.getSelectedItems()

                      if (items) {
                        editRouteScreens(
                          {
                            routeId: String(item.id),
                            screenIds: items.map((s: ScreenType) => s.id),
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
      title: routesT('edit'),
      description: routesT('editText'),
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>{modulesT('routes')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {modulesT('routes')}
          </h1>
        </div>
      </div>

      <DataPanel
        url='/routes'
        layout='table'
        id='routes'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'url', header: routesT('url') },
          { key: 'method', header: routesT('method') },
        ]}
        selected={selectedItems as RouteType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: routesT('editTooltip'),
            handler: (items: RouteType[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('delete'),
            tooltip: routesT('deleteTooltip'),
            variant: 'destructive',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            tooltip: routesT('createTooltip'),
            variant: 'default',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
