import DataPanel from '@/components/custom/data-panel'
import { FormPanel } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateAddressType,
  useDeleteAddressType,
  useEditAddressType,
} from '@/features/address-types'
import { useApp } from '@/hooks/use-app'
import { PersonAddressType } from '@/types/address-type'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonAddressType[]>([])
  const formEdit = useRef<any>(null)

  const { mutate: createAddressType } = useCreateAddressType()
  const { mutate: editAddressType } = useEditAddressType()
  const { mutate: deleteAddressTypes } = useDeleteAddressType()
  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()

  const { t: addressTypesT } = useTranslation('address-types')
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
      title: addressTypesT('create'),
      description: addressTypesT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: addressTypesT('name') },
              type: EnumFieldType.TEXT,
              required: true,
            },
          ]}
          form={form}
          button={{ text: actionsT('create') }}
          onSubmit={(data: PersonAddressType) => {
            createAddressType({
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

  const openDeleteDialog = (items: PersonAddressType[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: PersonAddressType) => (
            <div key={item.name} className='mb-5'>
              <h3 className='text-md font-semibold'>
                {item.id} - {item.name}
              </h3>
            </div>
          ))}
        </div>
      ),
      title: addressTypesT('delete'),
      description: addressTypesT('deleteText'),
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
            deleteAddressTypes(items.map((item) => item.id))
            closeDialog(id)
          },
        },
      ],
    })

    return id
  }

  const openEditDialog = (item: PersonAddressType) => {
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
                      label: { text: addressTypesT('name') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                  ]}
                  form={form}
                  onSubmit={(data: PersonAddressType) => {
                    editAddressType({ id: String(data.id), data })
                    closeSheet(id)
                  }}
                />
              ),
            },
          ]}
        />
      ),
      title: addressTypesT('edit'),
      description: addressTypesT('editText'),
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>{modulesT('addressTypes')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {modulesT('addressTypes')}
          </h1>
        </div>
      </div>
      <DataPanel
        url='/address-types'
        layout='table'
        id='address-types'
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 50 },
          { key: 'name', header: addressTypesT('name') },
        ]}
        selected={selectedItems as PersonAddressType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openEditDialog(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: addressTypesT('editTooltip'),
            handler: (items: PersonAddressType[]) => {
              if (items.length === 1) openEditDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('delete'),
            tooltip: addressTypesT('deleteTooltip'),
            variant: 'destructive',
            handler: openDeleteDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            tooltip: addressTypesT('createTooltip'),
            variant: 'default',
            handler: openCreateDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
