import { FieldValues, useForm } from 'react-hook-form'
import FormPanel from '@/components/custom/form-panel'
import { Card, CardContent } from '@/components/ui/card'
import TableView from '@/components/custom/table-view'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import EditableTableView from '@/components/custom/editable-table-view'
import DraggableListView from '@/components/custom/draggable-list-view'
import TreeView from '@/components/custom/tree-view'
import { IFormFieldProps, IFormValues } from '@/types/form-panel'
import GridView from '@/components/custom/grid-view'
import GridPanel from '@/components/custom/grid-panel'
import TablePanel from '@/components/custom/table-panel'
import { EnumFieldType } from '@/components/custom/field'
import PickerPanel from '@/components/custom/picker-panel'

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
      type: EnumFieldType.TEXT,
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
      type: EnumFieldType.TEXT,
      required: true,
    },
    {
      name: 'birthdate',
      label: {
        text: 'Birthdate',
        style: { fontWeight: 'bold' },
      },
      type: EnumFieldType.DATEPICKER,
      required: true,
    },
    {
      name: 'country',
      label: {
        text: 'Country',
        style: { fontWeight: 'bold', color: 'white' },
      },
      type: EnumFieldType.SELECT,
      required: true,
      options: countryOptionExample,
    },
    {
      name: 'color',
      label: {
        text: 'Color',
        style: { fontWeight: 'bold' },
      },
      type: EnumFieldType.COLOR,
      required: true,
    },
    {
      name: 'description',
      label: {
        text: 'Description',
        style: { fontWeight: 'bold' },
      },
      type: EnumFieldType.RICHTEXT,
      required: false,
    },
    {
      name: 'city',
      label: {
        text: 'City',
        style: { fontWeight: 'bold' },
      },
      type: EnumFieldType.MULTISELECT,
      required: true,
      options: cityOptionExample,
    },
    {
      name: 'cities',
      label: {
        text: 'Cities',
        style: { fontWeight: 'bold' },
      },
      type: EnumFieldType.SHEETPICKER,
      required: false,
      options: cityOptionExample,
    },
    {
      name: 'files',
      label: {
        text: 'Arquivos',
        style: { fontWeight: 'bold' },
      },
      type: EnumFieldType.FILE,
      required: false,
    },
    {
      name: 'cidades',
      label: {
        text: 'Cidades',
        style: { fontWeight: 'bold', color: 'white' },
      },
      type: EnumFieldType.RADIO,
      options: cityOptionExample,
      required: false,
    },
    {
      name: 'terms',
      type: EnumFieldType.CHECKBOX,
      options: [
        {
          value: 'terms',
          label: 'Aceite os termos de uso.',
        },
      ],
      required: false,
    },
    {
      name: 'percentage',
      label: {
        text: 'Milhar',
        style: { fontWeight: 'bold' },
      },
      type: EnumFieldType.RANGE,
      required: false,
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
      type: EnumFieldType.PASSWORD,
      required: true,
    },
  ]

  const defaultValues = fields.reduce((acc, field) => {
    if (field.defaultValue !== undefined) {
      acc[field.name as keyof IFormValues] = field.defaultValue
    }
    return acc
  }, {} as Partial<IFormValues>)

  const form = useForm<FieldValues>({ defaultValues })

  // table-view
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

  // table-panel
  const tablePanelColumns = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'Título' },
  ]

  const handleRowClick = (row: Record<string, any>) => {
    console.log('Linha clicada:', row)
  }

  const rowActions = [
    {
      label: () => <IconEdit color='orange' />,
      onClick: (row: Record<string, any>) => console.log('Editar', row),
    },
    {
      label: () => <IconTrash color='#c4212e' />,
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
      description: 'Sr. John',
      date: new Date('2024-08-31'),
      color: '#ff0000',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'user',
      isActive: false,
      description: 'Sra. Jane',
      date: new Date('2024-08-31'),
      color: '#00ff00',
    },
    {
      id: 3,
      name: 'John Doe',
      role: 'admin',
      isActive: true,
      description: 'Sr. John',
      date: new Date('2024-08-31'),
      color: '#ff0000',
    },
    {
      id: 4,
      name: 'Jane Smith',
      role: 'user',
      isActive: false,
      description: 'Sra. Jane',
      date: new Date('2024-08-31'),
      color: '#00ff00',
    },
  ]

  const editableTableViewColumns = [
    {
      header: 'Nome',
      key: 'name',
      type: EnumFieldType.TEXT,
    },
    {
      header: 'Cargo',
      key: 'role',
      type: EnumFieldType.SELECT,
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
    },
    {
      header: 'Ativo',
      key: 'isActive',
      options: [
        {
          value: 'confirms',
          label: 'Confirmar?',
        },
      ],
      type: EnumFieldType.CHECKBOX,
    },
    {
      header: 'Cor Favorita',
      key: 'color',
      type: EnumFieldType.COLOR,
    },
    { header: 'Descrição', key: 'description', type: EnumFieldType.TEXT },
    { header: 'Arquivo', key: 'file', type: EnumFieldType.FILE },
    {
      header: 'Date',
      key: 'date',
      type: EnumFieldType.DATEPICKER,
    },
  ]

  const propertyTableColumns = [
    { key: 'name', header: 'Nome', type: EnumFieldType.TEXT },
    {
      key: 'category',
      header: 'Categoria',
      type: EnumFieldType.SELECT,
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ],
    },
  ]

  const propertyTableData = [
    {
      name: 'Item 1',
      category: 'option1',
    },
    {
      name: 'Item 2',
      category: 'option2',
    },
  ]

  const handleSaveChanges = (updatedData: any) => {
    console.log('Dados atualizados:', updatedData)
  }

  // DraggableListView
  const draggableListViewItems = [
    { id: '1', label: 'Item 1' },
    { id: '2', label: 'Item 2' },
    { id: '3', label: 'Item 3' },
    { id: '4', label: 'Item 4' },
    { id: '5', label: 'Item 5' },
  ]

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
            caption='Lista de Usuários'
            onRowClick={handleRowClick}
            rowActions={rowActions}
          />
        </CardContent>
      </Card>
      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        TablePanel
      </h1>
      <Card className='mx-auto w-[800px]'>
        <CardContent>
          <TablePanel
            columns={tablePanelColumns}
            endpoint='https://jsonplaceholder.typicode.com/photos'
            sortable
            caption='Lista de Usuários'
            onRowClick={handleRowClick}
            rowActions={rowActions}
          />
        </CardContent>
      </Card>
      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        EditableTableView (property version)
      </h1>
      <Card className='mx-auto w-[900px]'>
        <CardContent>
          <EditableTableView
            isPropertyTable
            data={propertyTableData}
            columns={propertyTableColumns}
            onSaveChanges={handleSaveChanges}
          />
        </CardContent>
      </Card>
      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        EditableTableView (full version)
      </h1>
      <Card className='mx-auto w-[900px]'>
        <CardContent>
          <EditableTableView
            data={initialData}
            columns={editableTableViewColumns}
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
          data={Array.from({ length: 50 })}
          render={(_: any, index: number) => (
            <div key={index} className='rounded border border-gray-300 p-4'>
              <h3 className='text-lg font-semibold'>Item {index + 1}</h3>
              <p>Descrição do item {index + 1}</p>
            </div>
          )}
          gap={6}
          padding={4}
          itemsPerPage={[10, 20, 30, 40]}
        />
      </div>
      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        DraggableListView
      </h1>
      <DraggableListView data={draggableListViewItems} />
      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        TreeView
      </h1>
      <TreeView data={treeData} />
      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        GridPanel
      </h1>
      <GridPanel
        render={(item: any) => (
          <div key={item.id} className='rounded border border-gray-300 p-4'>
            <h3 className='text-lg font-semibold'>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        )}
        endpoint='https://jsonplaceholder.typicode.com/posts'
        responsiveColumns={{ default: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        gap={6}
        padding={4}
        itemsPerPage={[10, 20, 30, 40]}
      />
      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        PickerPanel (grid mode)
      </h1>
      <PickerPanel
        endpoint='https://jsonplaceholder.typicode.com/posts'
        type='grid'
        responsiveColumns={{ default: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        gap={6}
        padding={4}
        itemsPerPage={[10, 20, 30, 40]}
        render={(item: any) => (
          <div key={item.id}>
            <h3 className='text-lg font-semibold'>{item.title}</h3>
            <p>{item.body.slice(0, 50)}</p>
          </div>
        )}
      />

      <h1 style={{ textAlign: 'center', fontSize: 48, margin: '24px 0' }}>
        PickerPanel (table mode)
      </h1>
      <PickerPanel
        endpoint='https://jsonplaceholder.typicode.com/photos'
        type='table'
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'title', header: 'Title' },
        ]}
        sortable
      />
    </>
  )
}
