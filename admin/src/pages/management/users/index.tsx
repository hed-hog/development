import { DataPanel } from '@/components/custom/data-panel'
import FormPanel from '@/components/custom/form-panel'
import RoleBox from '@/components/custom/role-box'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateUser,
  useDeleteUser,
  useEditUser,
  useEditUserRoles,
} from '@/features/users'
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
      email: '',
    },
    mode: 'onChange',
  })

  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()
  const { mutate: deleteUsers } = useDeleteUser()
  const { mutate: createUser } = useCreateUser()
  const { mutate: editUser } = useEditUser()

  const openCreateDialog = () => {
    form.reset({
      id: '',
      name: '',
      email: '',
      password: '',
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
              label: { text: 'Senha' },
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

    const id = openSheet({
      children: () => (
        <TabPanel
          activeTabIndex={0}
          tabs={[
            {
              title: 'Detalhes',
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
                    closeSheet(id)
                  }}
                />
              ),
            },
            {
              title: 'Funções',
              children: <RoleBox userId={String(item.id)} />,
              buttons: [
                {
                  text: 'Cancelar',
                  variant: 'secondary',
                  onClick: () => {
                    closeSheet(id)
                  },
                },
              ],
            },
          ]}
        />
      ),
      title: 'Editar Usuário',
      description: 'Visualize e edite as informações do usuário.',
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>Users - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Users</h1>
        </div>
      </div>
      <DataPanel
        url='/users'
        layout='table'
        id='users'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
        ]}
        selected={selectedItems}
        multiple
        hasSearch
        sortable
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
      />
    </>
  )
}
