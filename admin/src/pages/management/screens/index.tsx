import { DataPanel } from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateScreen,
  useDeleteScreen,
  useEditScreen,
  useEditScreenRoles,
  useEditScreenRoutes,
} from '@/features/screens/api'
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
  const { t: modulesT } = useTranslation('modules')
  const { t: actionsT } = useTranslation('actions')
  const { t: screensT } = useTranslation('screens')

  const [selectedItems, setSelectedItems] = useState<
    (ScreenType | RoleType | RouteType)[]
  >([])
  const formEdit = useRef<any>(null)

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
      slug: '',
      description: '',
      icon: '',
    },
    mode: 'onChange',
  })

  const { openDialog, closeDialog, openSheet } = useApp()
  const { mutate: deleteRoles } = useDeleteScreen()
  const { mutate: createScreen } = useCreateScreen()
  const { mutate: editScreen } = useEditScreen()
  const { mutate: editScreenRoles } = useEditScreenRoles()
  const { mutate: editScreenRoutes } = useEditScreenRoutes()

  const screenRolesRef = useRef<any>(null)
  const screenRoutesRef = useRef<any>(null)

  const openCreateDialog = () => {
    form.reset({
      id: '',
      name: '',
      slug: '',
      description: '',
    })

    const id = openDialog({
      title: screensT('create'),
      description: screensT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: screensT('name') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'slug',
              label: { text: screensT('slug') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'description',
              label: { text: screensT('description') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'icon',
              label: { text: screensT('icon') },
              type: EnumFieldType.TEXT,
              required: true,
            },
          ]}
          form={form}
          button={{ text: actionsT('create') }}
          onSubmit={(data: ScreenType) => {
            createScreen(data)
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: ScreenType[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: ScreenType) => (
            <div key={item.name} className='mb-5'>
              <div className='flex flex-row items-center'>
                <h3 className='text-md font-semibold'>{item.name}</h3>
                <span className='ml-2 inline'>{getIcon(item.icon)}</span>
              </div>
              <p className='text-xs'>
                <b>{screensT('description')}:</b> {item.description}
              </p>
              <p className='text-xs'>
                <b>{screensT('slug')}:</b> {item.slug}
              </p>
            </div>
          ))}
        </div>
      ),
      title: screensT('delete'),
      description: screensT('deleteText'),
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
            deleteRoles(items.map((item) => item.id))
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

  const openEditDialog = (item: ScreenType) => {
    form.reset({
      id: item.id || '',
      name: item.name || '',
      slug: item.slug || '',
      description: item.description || '',
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
                  ref={formEdit}
                  fields={[
                    {
                      name: 'name',
                      label: { text: screensT('name') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'slug',
                      label: { text: screensT('slug') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'description',
                      label: { text: screensT('description') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'icon',
                      label: { text: screensT('icon') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: ScreenType) => {
                    editScreen({ id: String(data.id), data })
                    closeDialog(id)
                  }}
                />
              ),
            },
            {
              title: modulesT('roles'),
              children: (
                <DataPanel
                  ref={screenRolesRef}
                  selectable
                  multiple
                  layout='list'
                  id={`screen-roles-${item.id}`}
                  url={`/screens/${item.id}/roles`}
                  checked={(item: RoleType) => {
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
                    if (screenRolesRef.current) {
                      const items = screenRolesRef.current.getSelectedItems()

                      if (items) {
                        editScreenRoles(
                          {
                            screenId: String(item.id),
                            roleIds: items.map((r: RoleType) => r.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`screen-roles-${item.id}`],
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
                  ref={screenRoutesRef}
                  selectable
                  multiple
                  layout='list'
                  id={`screen-routes-${item.id}`}
                  url={`/screens/${item.id}/routes`}
                  checked={(item: RouteType) => {
                    return Boolean((item.route_screens ?? []).length)
                  }}
                  render={(item: RouteType) => (
                    <div className='flex flex-row gap-2'>
                      <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                        {item.method}
                      </code>
                      <code>{item.url}</code>
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
                    if (screenRoutesRef.current) {
                      const items = screenRoutesRef.current.getSelectedItems()

                      if (items) {
                        editScreenRoutes(
                          {
                            screenId: String(item.id),
                            routeIds: items.map((r: RouteType) => r.id),
                          },
                          {
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: [`screen-routes-${item.id}`],
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
      title: screensT('edit'),
      description: screensT('editText'),
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>{modulesT('screens')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {modulesT('screens')}
          </h1>
        </div>
      </div>

      <DataPanel
        url='/screens'
        layout='table'
        id='screens'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: screensT('name') },
          { key: 'slug', header: screensT('slug') },
          { key: 'description', header: screensT('description') },
          {
            key: 'icon',
            header: screensT('icon'),
            render: (item) => (
              <div className='flex flex-row gap-2'>
                {getIcon(item.icon)} {`${item.icon}`}
              </div>
            ),
          },
        ]}
        selected={selectedItems as ScreenType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: screensT('editTooltip'),
            handler: (items: ScreenType[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('delete'),
            tooltip: screensT('deleteTooltip'),
            variant: 'destructive',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            tooltip: screensT('createTooltip'),
            variant: 'default',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
