import { useForm } from 'react-hook-form'
import FormPanel from '@/components/custom/form-panel'
import { Card, CardContent } from '@/components/ui/card'
import TableView from '@/components/custom/table-view'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { RoleBasedAccessControl } from '@/components/custom/rbac-manager'

export default function MyForm() {
  // form

  const form = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const countryOptionExample = [
    { value: 'usa', label: 'USA' },
    { value: 'canada', label: 'Canada' },
  ]

  const cityOptionExample = [
    { value: 'SP', label: 'São Paulo' },
    { value: 'RJ', label: 'Rio de Janeiro' },
  ]

  const fields: any[] = [
    {
      name: 'username',
      label: {
        text: 'Username',
        style: { fontWeight: 'bold' },
      },
      element: {
        style: { borderRadius: 25, borderColor: 'white' },
      },
      type: 'text',
      required: true,
      description: {
        text: 'This is your public display name.',
        style: { color: 'gray' },
      },
    },
    {
      name: 'email',
      label: {
        text: 'Email',
        style: { fontWeight: 'bold' },
      },
      type: 'text',
      required: true,
    },
    {
      name: 'birthdate',
      label: {
        text: 'Birthdate',
        style: { fontWeight: 'bold' },
      },
      calendar: {
        style: { color: 'white' },
      },
      element: {
        style: {
          color: 'white',
        },
      },
      type: 'datepicker',
      required: true,
    },
    {
      name: 'country',
      label: {
        text: 'Country',
        style: { fontWeight: 'bold', color: 'white' },
      },
      element: {
        style: { color: 'white' },
      },
      trigger: {
        style: { color: 'white' },
      },
      type: 'select',
      required: true,
      options: countryOptionExample,
    },
    {
      name: 'color',
      label: {
        text: 'Color',
        style: { fontWeight: 'bold' },
      },
      type: 'color',
    },
    {
      name: 'description',
      label: {
        text: 'Description',
        style: { fontWeight: 'bold' },
      },
      type: 'richtext',
    },
    {
      name: 'city',
      label: {
        text: 'City',
        style: { fontWeight: 'bold' },
      },
      badge: {
        className: 'bg-red-500',
      },
      type: 'multiselect',
      required: true,
      options: cityOptionExample,
    },
    {
      name: 'cities',
      label: {
        text: 'Cities',
        style: { fontWeight: 'bold' },
      },
      type: 'pickersheet',
      options: cityOptionExample,
    },
    {
      name: 'files',
      label: {
        text: 'Arquivos',
        style: { fontWeight: 'bold' },
      },
      type: 'file',
    },
    {
      name: 'cidades',
      label: {
        text: 'Cidades',
        style: { fontWeight: 'bold', color: 'white' },
      },
      type: 'radio',
      element: {
        style: {
          backgroundColor: 'red',
        },
      },
      options: cityOptionExample,
    },
    {
      name: 'terms',
      type: 'checkbox',
      options: [
        {
          value: 'terms',
          label: 'Aceite os termos de uso.',
        },
      ],
      element: {
        style: {
          backgroundColor: 'green',
        },
      },
      label: {
        style: {
          color: 'red',
        },
      },
    },
    {
      name: 'percentage',
      label: {
        text: 'Milhar',
        style: { fontWeight: 'bold' },
      },
      element: {
        className: 'bg-red-500',
      },
      type: 'range',
      sliderOptions: {
        defaultValue: [500],
        max: 1000,
        step: 100,
      },
    },
    {
      name: 'password',
      label: {
        text: 'Sua Senha',
      },
      type: 'password',
      element: {
        style: { color: 'yellow' },
      },
    },
  ]

  // table
  const columns = [
    { key: 'name', header: 'Nome' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Função' },
  ]

  const data = [
    { name: 'João', email: 'joao@example.com', role: 'Admin' },
    { name: 'Maria', email: 'maria@example.com', role: 'User' },
    { name: 'João', email: 'joao@example.com', role: 'Admin' },
    { name: 'Maria', email: 'maria@example.com', role: 'User' },
    { name: 'João', email: 'joao@example.com', role: 'Admin' },
    { name: 'Maria', email: 'maria@example.com', role: 'User' },
    { name: 'João', email: 'joao@example.com', role: 'Admin' },
    { name: 'Maria', email: 'maria@example.com', role: 'User' },
    { name: 'João', email: 'joao@example.com', role: 'Admin' },
    { name: 'Maria', email: 'maria@example.com', role: 'User' },
  ]

  const handleRowClick = (row: Record<string, any>) => {
    console.log('Linha clicada:', row)
  }

  const rowActions = [
    {
      label: <IconEdit color='orange' />,
      onClick: (row: Record<string, any>) => console.log('Editar', row),
    },
    {
      label: <IconTrash color='#c4212e' />,
      onClick: (row: Record<string, any>) => console.log('Excluir', row),
    },
  ]

  // role based access control
  interface IUser {
    id: string
    name: string
    role: 'user' | 'admin'
  }

  const users: IUser[] = [
    { id: '1', name: 'Alice', role: 'user' },
    { id: '2', name: 'Bob', role: 'admin' },
    { id: '3', name: 'Charlie', role: 'user' },
  ]

  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        FormPanel
      </h1>
      <Card className='mx-auto w-[620px]'>
        <CardContent>
          <FormPanel
            title={{
              text: 'User Registration',
              style: {
                fontSize: '1.5rem',
                paddingTop: '1rem',
                fontWeight: 'bold',
              },
            }}
            subtitle={{
              text: 'Please fill in the form to register.',
              style: { fontSize: '1rem', color: 'gray' },
            }}
            fields={fields}
            form={form}
            onSubmit={onSubmit}
          />
        </CardContent>
      </Card>
      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        TableView
      </h1>
      <Card className='mx-auto w-[620px]'>
        <CardContent>
          <TableView
            columns={columns}
            data={data}
            sortable
            pagination
            caption='Lista de Usuários'
            onRowClick={handleRowClick}
            rowActions={rowActions}
            itemsPerPage={4}
          />
        </CardContent>
      </Card>
      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        RBAC Manager
      </h1>
      <Card className='mx-auto w-[620px]'>
        <CardContent>
          <h1 className='mb-6 text-2xl font-bold'>Gerenciamento de Acesso</h1>
          <RoleBasedAccessControl users={users} />
        </CardContent>
      </Card>
    </>
  )
}
