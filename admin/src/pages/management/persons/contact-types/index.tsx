import DataPanel from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateContactType,
  useDeleteContactType,
  useEditContactType,
} from '@/features/contact-types'
import { useApp } from '@/hooks/use-app'
import { PersonContactType } from '@/types/contact-type'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonContactType[]>([])
  const formEdit = useRef<any>(null)

  const { mutate: createContactType } = useCreateContactType()
  const { mutate: editContactType } = useEditContactType()
  const { mutate: deleteContactTypes } = useDeleteContactType()
  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()

  const { t: contactTypesT } = useTranslation('contact-types')
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
      title: contactTypesT('create'),
      description: contactTypesT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: contactTypesT('name') },
              type: EnumFieldType.TEXT,
              required: true,
            },
          ]}
          form={form}
          button={{ text: actionsT('create') }}
          onSubmit={(data: PersonContactType) => {
            createContactType({
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

  const openDeleteDialog = (items: PersonContactType[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: PersonContactType) => (
            <div key={item.name} className='mb-5'>
              <h3 className='text-md font-semibold'>
                {item.id} - {item.name}
              </h3>
            </div>
          ))}
        </div>
      ),
      title: contactTypesT('delete'),
      description: contactTypesT('deleteText'),
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
            deleteContactTypes(items.map((item) => item.id))
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

  const openEditDialog = (item: PersonContactType) => {
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
                      label: { text: contactTypesT('name') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: PersonContactType) => {
                    editContactType({ id: String(data.id), data })
                    closeSheet(id)
                  }}
                />
              ),
            },
          ]}
        />
      ),
      title: contactTypesT('edit'),
      description: contactTypesT('editText'),
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>{modulesT('contactTypes')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {modulesT('contactTypes')}
          </h1>
        </div>
      </div>

      <DataPanel
        url='/contact-types'
        layout='table'
        id='contact-types'
        selectable
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: contactTypesT('name') },
        ]}
        selected={selectedItems as PersonContactType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: contactTypesT('editTooltip'),
            handler: (items: PersonContactType[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('delete'),
            tooltip: contactTypesT('deleteTooltip'),
            variant: 'destructive',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            tooltip: contactTypesT('createTooltip'),
            variant: 'default',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
