import DataPanel from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreatePerson,
  useDeletePerson,
  useEditPerson,
} from '@/features/persons'
import { useApp } from '@/hooks/use-app'
import { formatDate } from '@/lib/date-string'
import { PersonType } from '@/types/person'
import { IconEdit, IconId, IconPlus, IconTrash } from '@tabler/icons-react'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonType[]>([])
  const formEdit = useRef<any>(null)

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
      type_id: 0,
      birth_at: new Date(),
    },
    mode: 'onChange',
  })

  const { mutate: createPerson } = useCreatePerson()
  const { mutate: editPerson } = useEditPerson()
  const { mutate: deletePersons } = useDeletePerson()
  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()

  const openCreateDialog = () => {
    form.reset({
      id: '',
      name: '',
      type_id: 0,
      birth_at: new Date(),
    })

    const id = openDialog({
      title: 'Criar Pessoa',
      description: 'Preencha as informações do pessoa.',
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
              name: 'type_id',
              label: { text: 'TypeID' },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'birth_at',
              label: { text: 'Birth Date' },
              type: EnumFieldType.DATEPICKER,
              required: true,
            },
          ]}
          form={form}
          button={{ text: 'Criar' }}
          onSubmit={(data: PersonType) => {
            createPerson({
              id: Number(data.id),
              type_id: Number(data.type_id),
              name: data.name,
              birth_at: formatDate(data.birth_at),
            })
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: PersonType[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: PersonType) => (
            <div key={item.name} className='mb-5'>
              <h3 className='text-md font-semibold'>{item.name}</h3>
              <p className='text-xs'>{String(item.birth_at)}</p>
            </div>
          ))}
        </div>
      ),
      title: 'Excluir Pessoa',
      description: 'Tem certeza de que deseja deletar estas pessoas?',
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
            deletePersons(items.map((item) => item.id))
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

  const openEditDialog = (item: PersonType) => {
    form.reset({
      id: item.id || '',
      name: item.name || '',
      type_id: item.type_id || 0,
      birth_at: item.birth_at || new Date(),
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
                      name: 'type_id',
                      label: { text: 'TypeID' },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },
                    {
                      name: 'birth_at',
                      label: { text: 'Birth Date' },
                      type: EnumFieldType.DATEPICKER,
                      required: true,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: PersonType) => {
                    editPerson({ id: String(data.id), data })
                    closeSheet(id)
                  }}
                />
              ),
            },
          ]}
        />
      ),
      title: 'Editar Pessoa',
      description: 'Visualize e edite as informações do pessoa.',
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>Persons - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Persons</h1>
        </div>
      </div>

      <DataPanel
        url='/persons'
        layout='grid'
        id='persons'
        selectable
        render={(item: PersonType) => (
          <Card className='mx-auto w-full max-w-lg rounded-lg border border-gray-200 bg-[#020817] shadow-lg'>
            <CardHeader className='rounded-t-lg bg-[#3576df] px-6 py-4 text-white'>
              <CardTitle className='text-xl font-semibold'>
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent className='px-4 py-4'>
              <div className='mb-4 flex items-center'>
                <CalendarIcon className='text-white-500 mr-3 h-6 w-6' />
                <div>
                  <span className='text-white-600 block text-sm'>
                    Date of Birth
                  </span>
                  <span className='text-white-800 text-sm font-medium'>
                    {formatDate(item.birth_at)}
                  </span>
                </div>
              </div>
              <div className='mb-4 flex items-center'>
                <MapPinIcon className='text-white-500 mr-3 h-6 w-6' />
                <div>
                  <span className='text-white-600 block text-sm'>Address</span>
                  <span className='text-white-800 text-sm font-medium'>
                    Rua dos Cravos, 256
                  </span>
                </div>
              </div>
              <div className='flex items-center'>
                <IconId className='text-white-500 mr-3 h-6 w-6' />
                <div>
                  <span className='text-white-600 block text-sm'>Document</span>
                  <span className='text-white-800 text-sm font-medium'>
                    123.456.789-00
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        selected={selectedItems as PersonType[]}
        multiple
        hasSearch
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: 'Editar',
            tooltip: 'Editar as pessoas selecionados',
            handler: (items: PersonType[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: 'Excluir',
            variant: 'destructive',
            tooltip: 'Excluir as pessoas selecionados',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: 'Criar',
            variant: 'default',
            tooltip: 'Criar novo pessoa',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
