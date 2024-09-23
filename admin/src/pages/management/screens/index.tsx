import { DataPanel } from '@/components/custom/data-panel'
import FormPanel from '@/components/custom/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateScreen,
  useDeleteScreen,
  useEditScreen,
} from '@/features/screens/api'
import { useApp } from '@/hooks/use-app'
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
      slug: '',
      description: '',
      icon: '',
    },
    mode: 'onChange',
  })

  const { openDialog, closeDialog } = useApp()
  const { mutate: deleteRoles } = useDeleteScreen()
  const { mutate: createScreen } = useCreateScreen()
  const { mutate: editScreen } = useEditScreen()

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
      children: () => {
        return items.map((item: any) => (
          <div key={item.name} className='mb-5'>
            <h3 className='text-md font-semibold'>{item.name}</h3>
            <p className='text-xs'>
              <b>Description:</b> {item.description}
            </p>
            <p className='text-xs'>
              <b>Slug:</b> {item.slug}
            </p>
            <p className='text-xs'>
              <b>Icon:</b> {item.icon}
            </p>
          </div>
        ))
      },
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
          button={{ text: 'Editar' }}
          onSubmit={(data) => {
            editScreen({ id: data.id, data })
            closeDialog(id)
          }}
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
          { key: 'icon', header: 'Ícone' },
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
