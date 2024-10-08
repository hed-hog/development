import DataPanel from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateCustomType,
  useDeleteCustomType,
  useEditCustomType,
} from '@/features/custom-types'
import { useApp } from '@/hooks/use-app'
import { PersonCustomType } from '@/types/custom-type'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonCustomType[]>([])
  const formEdit = useRef<any>(null)

  const { mutate: createCustomType } = useCreateCustomType()
  const { mutate: editCustomType } = useEditCustomType()
  const { mutate: deleteCustomTypes } = useDeleteCustomType()
  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()

  const { t: customTypesT } = useTranslation('custom-types')
  const { t: modulesT } = useTranslation('modules')
  const { t: actionsT } = useTranslation('actions')

  const form = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
    },
    mode: 'onChange',
  })

  const openCreateDialog = () => {
    form.reset({
      id: '',
      name: '',
    })

    const id = openDialog({
      title: customTypesT('create'),
      description: customTypesT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: customTypesT('name') },
              type: EnumFieldType.TEXT,
              required: true,
            },
          ]}
          form={form}
          button={{ text: actionsT('create') }}
          onSubmit={(data: PersonCustomType) => {
            createCustomType({
              id: Number(data.id),
              name: data.name,
            })
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeleteDialog = (items: PersonCustomType[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: PersonCustomType) => (
            <div key={item.name} className='mb-5'>
              <h3 className='text-md font-semibold'>
                {item.id} - {item.name}
              </h3>
            </div>
          ))}
        </div>
      ),
      title: customTypesT('delete'),
      description: customTypesT('deleteText'),
      buttons: [
        {
          text: actionsT('cancel'),
          variant: 'secondary',
          onClick: () => {
            setSelectedItems(items)
            closeDialog(id)
          },
        },
        {
          text: actionsT('delete'),
          variant: 'destructive',
          onClick: () => {
            deleteCustomTypes(items.map((item) => item.id))
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

  const openEditDialog = (item: PersonCustomType) => {
    form.reset({
      id: item.id || '',
      name: item.name || '',
    })

    const id = openSheet({
      children: () => (
        <TabPanel
          activeTabIndex={0}
          tabs={[
            {
              title: actionsT('details'),
              buttons: [
                {
                  text: actionsT('save'),
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
                      label: { text: customTypesT('name') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: PersonCustomType) => {
                    editCustomType({ id: String(data.id), data })
                    closeSheet(id)
                  }}
                />
              ),
            },
          ]}
        />
      ),
      title: customTypesT('edit'),
      description: customTypesT('editText'),
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>{modulesT('customs')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {modulesT('customs')}
          </h1>
        </div>
      </div>

      <DataPanel
        url='/custom-types'
        layout='table'
        id='custom-types'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: customTypesT('name') },
        ]}
        onItemDoubleClick={(item) => openEditDialog(item)}
        selected={selectedItems as PersonCustomType[]}
        multiple
        hasSearch
        sortable
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: actionsT('editTooltip'),
            handler: (items: PersonCustomType[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('delete'),
            tooltip: actionsT('deleteTooltip'),
            variant: 'destructive',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            tooltip: actionsT('createTooltip'),
            variant: 'default',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
