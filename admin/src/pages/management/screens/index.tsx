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
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<any[]>([])
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
      title: 'Criar Tela',
      description: 'Preencha as informações da tela.',
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
              name: 'slug',
              label: { text: 'Slug' },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'description',
              label: { text: 'Descrição' },
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
            createScreen(data)
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
            <div key={item.name} className='mb-5'>
              <div className='flex flex-row items-center'>
                <h3 className='text-md font-semibold'>{item.name}</h3>
                <span className='ml-2 inline'>{getIcon(item.icon)}</span>
              </div>
              <p className='text-xs'>
                <b>Description:</b> {item.description}
              </p>
              <p className='text-xs'>
                <b>Slug:</b> {item.slug}
              </p>
            </div>
          ))}
        </div>
      ),
      title: 'Excluir Tela',
      description: 'Tem certeza de que deseja deletar estas telas?',
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
            deleteRoles(items.map((item) => item.id))
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
                      name: 'name',
                      label: { text: 'Nome' },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'slug',
                      label: { text: 'Slug' },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'description',
                      label: { text: 'Descrição' },
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
                    editScreen({ id: data.id, data })
                    closeDialog(id)
                  }}
                />
              ),
            },
            {
              title: 'Funções',
              children: (
                <DataPanel
                  ref={screenRolesRef}
                  selectable
                  multiple
                  layout='list'
                  id={`screen-roles-${item.id}`}
                  url={`/screens/${item.id}/roles`}
                  checked={(item: any) => {
                    return (item.role_screens ?? []).length
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
                    if (screenRolesRef.current) {
                      const items = screenRolesRef.current.getSelectedItems()

                      if (items) {
                        editScreenRoles({
                          screenId: item.id,
                          roleIds: items.map((r: any) => r.id),
                        })
                      }
                    }
                  },
                },
              ],
            },
            {
              title: 'Rotas',
              children: (
                <DataPanel
                  ref={screenRoutesRef}
                  selectable
                  multiple
                  layout='list'
                  id={`screen-routes-${item.id}`}
                  url={`/screens/${item.id}/routes`}
                  checked={(item) => {
                    return (item.route_screens ?? []).length
                  }}
                  render={(item: any) => (
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
                  text: 'Aplicar',
                  variant: 'default',
                  onClick: () => {
                    if (screenRoutesRef.current) {
                      const items = screenRoutesRef.current.getSelectedItems()

                      if (items) {
                        editScreenRoutes({
                          screenId: item.id,
                          routeIds: items.map((r: any) => r.id),
                        })
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
      description: 'Visualize e edite as informações do cargo.',
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>Screens - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Screens</h1>
        </div>
      </div>

      <DataPanel
        url='/screens'
        layout='table'
        id='screens'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: 'Name' },
          { key: 'slug', header: 'Slug' },
          { key: 'description', header: 'Descrição' },
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
            tooltip: 'Editar as telas selecionados',
            handler: (items: any[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: 'Excluir',
            variant: 'destructive',
            tooltip: 'Excluir as telas selecionados',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: 'Criar',
            variant: 'default',
            tooltip: 'Criar nova tela',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
