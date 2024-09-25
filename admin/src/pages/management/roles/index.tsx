import { DataPanel } from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useCreateRole, useDeleteRole, useEditRole } from '@/features/roles/api'
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
      description: '',
    },
    mode: 'onChange',
  })

  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()
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
      title: 'Criar Cargo',
      description: 'Preencha as informações do cargo.',
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
              name: 'description',
              label: { text: 'Descrição' },
              type: EnumFieldType.TEXT,
              required: true,
            },
          ]}
          form={form}
          button={{ text: 'Criar' }}
          onSubmit={(data) => {
            createRole(data)
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: any[]) => {
    const id = openDialog({
      children: () => {
        return items.map((item: any) => (
          <div key={item.name} className='mb-5'>
            <h3 className='text-md font-semibold'>{item.name}</h3>
            <p className='text-xs'>{item.description}</p>
          </div>
        ))
      },
      title: 'Excluir Cargo',
      description: 'Tem certeza de que deseja deletar estes cargos?',
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
      description: item.description || '',
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
                      name: 'description',
                      label: { text: 'Descrição' },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data) => {
                    editRole({ id: data.id, data })
                    closeSheet(id)
                  }}
                />
              ),
            },
            {
              title: 'Usuários',
              children: (
                <DataPanel
                  selectable
                  multiple
                  layout='list'
                  id={`role-users-${item.id}`}
                  url={`/roles/${item.id}/users`}
                  checked={(item) => {
                    return (item.role_users ?? []).length
                  }}
                  onSelectionChange={(selectedItems) => {
                    console.log({ selectedItems })
                  }}
                />
              ),
              buttons: [
                {
                  text: 'Aplicar',
                  variant: 'default',
                  onClick: () => {},
                },
              ],
            },
            {
              title: 'Rotas',
              children: (
                <DataPanel
                  selectable
                  multiple
                  layout='list'
                  id={`role-routes-${item.id}`}
                  url={`/roles/${item.id}/routes`}
                  render={(item: any) => (
                    <div className='flex flex-row gap-2'>
                      <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                        {item.method}
                      </code>
                      <code>{item.url}</code>
                    </div>
                  )}
                  checked={(item) => {
                    return (item.role_routes ?? []).length
                  }}
                  onSelectionChange={(selectedItems) => {
                    console.log({ selectedItems })
                  }}
                />
              ),
              buttons: [
                {
                  text: 'Aplicar',
                  variant: 'default',
                  onClick: () => {},
                },
              ],
            },
            {
              title: 'Menus',
              children: (
                <DataPanel
                  selectable
                  multiple
                  layout='list'
                  id={`role-menus-${item.id}`}
                  url={`/roles/${item.id}/menus`}
                  render={(item: any) => (
                    <div className='flex flex-row items-center gap-2'>
                      {getIcon(item.icon || '')}
                      <code>
                        {item.name} - {item.url}
                      </code>
                    </div>
                  )}
                  checked={(item) => {
                    return (item.role_menus ?? []).length
                  }}
                  onSelectionChange={(selectedItems) => {
                    console.log({ selectedItems })
                  }}
                />
              ),
              buttons: [
                {
                  text: 'Aplicar',
                  variant: 'default',
                  onClick: () => {},
                },
              ],
            },
            {
              title: 'Telas',
              children: (
                <DataPanel
                  selectable
                  multiple
                  layout='list'
                  id={`role-screens-${item.id}`}
                  url={`/roles/${item.id}/screens`}
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
                    return (item.role_screens ?? []).length
                  }}
                  onSelectionChange={(selectedItems) => {
                    console.log({ selectedItems })
                  }}
                />
              ),
              buttons: [
                {
                  text: 'Aplicar',
                  variant: 'default',
                  onClick: () => {},
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
        <title>Roles - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Roles</h1>
        </div>
      </div>

      <DataPanel
        url='/roles'
        layout='table'
        id='roles'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: 'Name' },
          { key: 'description', header: 'Descrição' },
        ]}
        selected={selectedItems}
        multiple
        hasSearch
        sortable
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: 'Editar',
            tooltip: 'Editar os cargos selecionados',
            handler: (items: any[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: 'Excluir',
            variant: 'destructive',
            tooltip: 'Excluir os cargos selecionados',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: 'Criar',
            variant: 'default',
            tooltip: 'Criar novo cargo',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
