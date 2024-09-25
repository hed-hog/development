import { DataPanel } from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useCreateMenu, useDeleteMenu, useEditMenu } from '@/features/menus/api'
import { useApp } from '@/hooks/use-app'
import { getIcon } from '@/lib/get-icon'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<any[]>([])

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
      url: '',
      icon: '',
    },
    mode: 'onChange',
  })

  const { openDialog, closeDialog } = useApp()
  const { mutate: deleteMenu } = useDeleteMenu()
  const { mutate: createMenu } = useCreateMenu()
  const { mutate: editMenu } = useEditMenu()

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
      children: () => {
        return items.map((item: any) => (
          <div key={item.name} className='mb-5'>
            <h3 className='text-md font-semibold'>{item.name}</h3>
            <p className='text-xs'>
              <b>Description:</b> {item.description}
            </p>
            <p className='text-xs'>
              <b>URL:</b> {item.url}
            </p>
            <p className='text-xs'>
              <b>Icon:</b> {item.icon}
            </p>
          </div>
        ))
      },
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

    const id = openDialog({
      children: () => (
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
          button={{ text: 'Editar' }}
          onSubmit={(data) => {
            editMenu({ id: data.id, data })
            closeDialog(id)
          }}
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
