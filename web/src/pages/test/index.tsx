import { DataPanel } from '@/components/custom/data-panel'
import FormPanel from '@/components/custom/form-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { useCreateUser, useDeleteUser, useEditUser } from '@/features/users'
import { useApp } from '@/hooks/use-app'
import {
  IconEdit,
  IconInfoCircle,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

export default function Screen() {
  const [selectedItems, setSelectedItems] = useState<any[]>([])

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const { openDialog, closeDialog } = useApp()
  const { mutate: deleteUsers } = useDeleteUser()
  const { mutate: createUser } = useCreateUser()
  const { mutate: editUser } = useEditUser()

  const openInfoDialog = (items: any[]) => {
    setSelectedItems(items)

    const id = openDialog({
      children: () => {
        return items.map((item: any) => (
          <div key={item.email} className='mb-5 border-b'>
            <div className='flex flex-row items-center'>
              <span className='mr-1 text-xs'>ID:</span>
              <h3 className='text-md font-semibold'>{item.id}</h3>
            </div>
            <div className='flex flex-row items-center'>
              <span className='mr-1 text-xs'>Nome:</span>
              <h3 className='text-md font-semibold'>{item.name}</h3>
            </div>
            <div className='flex flex-row items-center'>
              <span className='mr-1 text-xs'>Email:</span>
              <h3 className='text-md font-semibold'>{item.email}</h3>
            </div>
          </div>
        ))
      },
      title: 'Informações de Usuário',
      description: 'Confira mais informações sobre os usuários selecionados.',
    })

    return id
  }

  const openCreateDialog = () => {
    form.reset({
      id: '',
      name: '',
      email: '',
    })

    const id = openDialog({
      title: 'Criar Usuário',
      description: 'Preencha as informações do usuário.',
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
              name: 'email',
              label: { text: 'Email' },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'password',
              label: { text: 'Password' },
              type: EnumFieldType.PASSWORD,
              required: true,
            },
          ]}
          form={form}
          button={{ text: 'Criar' }}
          onSubmit={(data) => {
            createUser(data)
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
          <div key={item.email} className='mb-5'>
            <h3 className='text-md font-semibold'>{item.name}</h3>
            <p className='text-xs'>{item.email}</p>
          </div>
        ))
      },
      title: 'Excluir Usuário',
      description: 'Tem certeza de que deseja deletar estes usuários?',
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
            deleteUsers(items.map((item) => item.id))
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
      email: item.email || '',
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
              name: 'email',
              label: { text: 'Email' },
              type: EnumFieldType.TEXT,
              required: false,
            },
          ]}
          form={form}
          button={{ text: 'Editar' }}
          onSubmit={(data) => {
            editUser({ id: data.id, data })
            closeDialog(id)
          }}
        />
      ),
      title: 'Editar Usuário',
      description: 'Atualize as informações do usuário.',
    })

    return id
  }

  return (
    <>
      <h2 className='text-2xl font-bold tracking-tight'>Usuários</h2>
      <p className='text-muted-foreground'>
        Confira todos os usuários cadastrados no sistema.
      </p>
      {/* <DataPanel
        id='data-panel-grid-example'
        url='/users'
        hasSearch
        selectable
        multiple
        selected={selectedItems}
        render={(item: any) => {
          return (
            <div key={item.email} className='w-96'>
              <h3 className='text-lg font-semibold'>{item.name}</h3>
              <p>{item.email}</p>
            </div>
          )
        }}
        menuOrders={[
          {
            label: 'Nome - A-Z',
            field: 'name',
            order: 'asc',
          },
          {
            label: 'Nome - Z-A',
            field: 'name',
            order: 'desc',
          },
          {
            label: 'Email - A-Z',
            field: 'email',
            order: 'asc',
          },
          {
            label: 'Email - Z-A',
            field: 'email',
            order: 'desc',
          },
        ]}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: 'Editar',
            tooltip: 'Editar usuários selecionados',
            handler: (items: any[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconInfoCircle className='mr-1 w-8 cursor-pointer' />,
            label: 'Visualizar',
            tooltip: 'Visualizar mais informações dos usuários selecionados',
            handler: openInfoDialog,
            show: 'some',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: 'Excluir',
            variant: 'destructive',
            tooltip: 'Excluir os usuários selecionados',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: 'Criar',
            variant: 'default',
            tooltip: 'Criar novo usuário',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
        onSelectionChange={(selectedItems) => {
          console.log('data-panel grid', selectedItems)
        }}
      /> */}
      <DataPanel
        id='data-panel-table-example'
        layout='table'
        url='/users'
        hasSearch
        selectable
        multiple
        sortable
        selected={selectedItems}
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
        ]}
        menuOrders={[
          {
            label: 'Nome - A-Z',
            field: 'name',
            order: 'asc',
          },
          {
            label: 'Nome - Z-A',
            field: 'name',
            order: 'desc',
          },
          {
            label: 'Email - A-Z',
            field: 'email',
            order: 'asc',
          },
          {
            label: 'Email - Z-A',
            field: 'email',
            order: 'desc',
          },
        ]}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: 'Editar',
            tooltip: 'Editar usuários selecionados',
            handler: (items: any[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconInfoCircle className='mr-1 w-8 cursor-pointer' />,
            label: 'Informações',
            tooltip: 'Visualizar mais informações dos usuários selecionados',
            handler: openInfoDialog,
            show: 'some',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: 'Excluir',
            variant: 'destructive',
            tooltip: 'Excluir os usuários selecionados',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: 'Criar',
            variant: 'default',
            tooltip: 'Criar novo usuário',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
        onSelectionChange={(selectedItems) => {
          console.log('data-panel grid', selectedItems)
        }}
      />
    </>
  )
}
