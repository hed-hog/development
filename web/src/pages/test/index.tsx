import { FieldValues, useForm } from 'react-hook-form'
import FormPanel from '@/components/custom/form-panel'
import { Card, CardContent } from '@/components/ui/card'
import TableView from '@/components/custom/table-view'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import PropertyTableView from '@/components/custom/property-table-view'
import ListView from '@/components/custom/list-view'
import TreeView from '@/components/custom/tree-view'
import { IFormFieldProps, IFormValues } from '@/types/form-panel'
import GridView from '@/components/custom/grid-view'

export default function MyForm() {
  // form
  const onSubmit = (data: IFormValues) => {
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

  const fields: IFormFieldProps[] = [
    {
      name: 'username',
      defaultValue: 'Gabriel Lima',
      label: {
        text: 'Username',
        style: { fontWeight: 'bold' },
      },
      // input: {
      //   style: { borderRadius: 25, borderColor: 'white' },
      // },
      type: 'text',
      required: true,
      description: {
        text: 'This is your public display name.',
        style: { color: 'gray' },
      },
    },
    {
      name: 'email',
      defaultValue: 'glima@hcode.com.br',
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
      // calendar: {
      //   style: { color: 'white' },
      // },
      // input: {
      //   style: {
      //     color: 'white',
      //   },
      // },
      type: 'datepicker',
      required: true,
    },
    {
      name: 'country',
      label: {
        text: 'Country',
        style: { fontWeight: 'bold', color: 'white' },
      },
      // input: {
      //   style: { color: 'yellow' },
      // },
      // option: {
      //   style: { color: 'red' },
      // },
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
      // badge: {
      //   className: 'bg-red-500',
      // },
      // input: {
      //   style: { backgroundColor: '#fff' },
      // },
      // actionButtons: {
      //   style: {
      //     backgroundColor: 'green',
      //   },
      // },
      // items: {
      //   style: {
      //     backgroundColor: 'black',
      //   },
      // },
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
      // input: {
      //   style: {
      //     backgroundColor: 'red',
      //   },
      // },
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
      // input: {
      //   style: {
      //     backgroundColor: 'green',
      //   },
      // },
      // container: {
      //   style: {
      //     backgroundColor: 'white',
      //   },
      // },
      // label: {
      //   style: {
      //     color: 'red',
      //   },
      // },
    },
    {
      name: 'percentage',
      label: {
        text: 'Milhar',
        style: { fontWeight: 'bold' },
      },
      // input: {
      //   className: 'bg-red-500',
      // },
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
      // input: {
      //   style: { color: 'yellow' },
      // },
    },
  ]

  const defaultValues = fields.reduce((acc, field) => {
    if (field.defaultValue !== undefined) {
      acc[field.name as keyof IFormValues] = field.defaultValue
    }
    return acc
  }, {} as Partial<IFormValues>)

  const form = useForm<FieldValues>({ defaultValues })

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
  const initialData = [
    {
      id: 1,
      name: 'John Doe',
      role: 'admin',
      isActive: true,
      color: '#ff0000',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'user',
      isActive: false,
      color: '#00ff00',
    },
  ]

  const propertyTableViewColumns = [
    { header: 'Nome', key: 'name', type: 'text' },
    {
      header: 'Cargo',
      key: 'role',
      type: 'select',
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
    },
    { header: 'Ativo', key: 'isActive', type: 'checkbox' },
    { header: 'Cor Favorita', key: 'color', type: 'color' },
    { header: 'Descrição', key: 'description', type: 'text' },
    { header: 'Arquivo', key: 'file', type: 'file' },
    { header: 'Date', key: 'date', type: 'datepicker' },
  ]

  const handleSaveChanges = (updatedData: any) => {
    console.log('Dados atualizados:', updatedData)
  }

  // ListView
  const listViewItems = [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' },
    { id: '4', label: 'Item 4' },
    { id: '5', label: 'Item 5' },
  ]

  // grid
  const gridItems = Array.from({ length: 50 }, (_, index) => (
    <div key={index} className='rounded border border-gray-300 p-4'>
      <h3 className='text-lg font-semibold'>Item {index + 1}</h3>
      <p>Descrição do item {index + 1}</p>
    </div>
  ))

  // treeView
  const treeData = [
    {
      id: '1',
      title: 'Root Node',
      children: [
        {
          id: '2',
          title: 'Child Node 1',
        },
        {
          id: '3',
          title: 'Child Node 2',
          children: [
            {
              id: '4',
              title: 'Grandchild Node 1',
            },
          ],
        },
      ],
    },
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
        PropertyTableView
      </h1>
      <Card className='mx-auto w-[900px]'>
        <CardContent>
          <PropertyTableView
            data={initialData}
            columns={propertyTableViewColumns}
            onSaveChanges={handleSaveChanges}
          />
        </CardContent>
      </Card>
      <div className='p-6'>
        <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
          GridView
        </h1>
        <GridView
          responsiveColumns={{
            default: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
          }}
          data={gridItems}
          gap={6}
          padding={4}
          itemsPerPage={[10, 20, 30, 40]}
        />
      </div>
      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        ListView
      </h1>
      <ListView data={listViewItems} />
      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        TreeView
      </h1>
      <TreeView data={treeData} />
    </>
  )
}
