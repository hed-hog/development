import AddressCard from '@/components/custom/address-card'
import { Button } from '@/components/custom/button'
import ContactCard from '@/components/custom/contact-card'
import DataPanel from '@/components/custom/data-panel'
import DocumentCard from '@/components/custom/document-card'
import { FormPanel } from '@/components/custom/form-panel'
import { TabPanel } from '@/components/custom/tab-panel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useCreateAddress,
  useDeleteAddress,
  useEditAddress,
} from '@/features/address'
import { useAddressTypes } from '@/features/address-types'
import { useCountries } from '@/features/country'
import { usePersonTypes } from '@/features/person-types'
import {
  useCreatePerson,
  useDeletePerson,
  useEditPerson,
} from '@/features/persons'
import { useApp } from '@/hooks/use-app'
import { formatDate } from '@/lib/date-string'
import timeSince from '@/lib/time-since'
import { PersonAddress } from '@/types/address'
import { IFormFieldOption } from '@/types/form-panel'
import { PersonType } from '@/types/person'
import {
  IconCalendarClock,
  IconClock,
  IconEdit,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'

export default function Page() {
  const formAddressDefaultValues = {
    id: 0,
    street: '',
    number: 0,
    country_id: 24,
    complement: '',
    district: '',
    city: '',
    state: '',
    postal_code: '',
    reference: '',
    type_id: 1,
  }
  const [selectedItems, setSelectedItems] = useState<PersonType[]>([])
  const [personTypes, setPersonTypes] = useState<IFormFieldOption[]>([])
  const [addressTypes, setAddressTypes] = useState<IFormFieldOption[]>([])
  const [countries, setCountries] = useState<IFormFieldOption[]>([])
  const formEdit = useRef<any>(null)

  const formPerson = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
      type_id: 0,
      birth_at: new Date(),
    },
    mode: 'onChange',
  })

  const formAddress = useForm<PersonAddress>({
    defaultValues: formAddressDefaultValues,
    mode: 'onChange',
  })

  const { mutate: createPerson } = useCreatePerson()
  const { mutate: editPerson } = useEditPerson()
  const { mutate: deletePersons } = useDeletePerson()
  const { mutate: createAddress } = useCreateAddress()
  const { mutate: editAddress } = useEditAddress()
  const { mutate: deleteAddress } = useDeleteAddress()
  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()
  const { data: personTypeData } = usePersonTypes()
  const { data: addressTypeData } = useAddressTypes()
  const { data: countriesData } = useCountries()

  useEffect(() => {
    if (!personTypeData) return
    const personTypes = (personTypeData?.data as any).data.map(
      (type: { id: number; name: string }) => ({
        value: type.id,
        label: type.name,
      })
    )
    setPersonTypes(personTypes)
  }, [personTypeData])

  useEffect(() => {
    if (!addressTypeData) return
    const addressTypes = (addressTypeData?.data as any).data.map(
      (type: { id: number; name: string }) => ({
        value: type.id,
        label: type.name,
      })
    )
    setAddressTypes(addressTypes)
  }, [addressTypeData])

  useEffect(() => {
    if (!countriesData) return
    const countries = (countriesData.data as any).map(
      (country: { id: number; name: string }) => ({
        value: country.id,
        label: country.name,
      })
    )
    setCountries(countries)
  }, [countriesData])

  const openCreatePersonDialog = () => {
    formPerson.reset({
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
              label: { text: 'Tipo de Pessoa' },
              type: EnumFieldType.SELECT,
              required: true,
              options: personTypes,
            },
            {
              name: 'birth_at',
              label: { text: 'Data de Nascimento' },
              type: EnumFieldType.DATEPICKER,
              required: true,
            },
          ]}
          form={formPerson}
          button={{ text: 'Criar' }}
          onSubmit={(data: PersonType) => {
            createPerson({
              id: Number(data.id),
              type_id: Number(data.type_id),
              name: data.name,
              birth_at: new Date(data.birth_at) as unknown as string,
            })
            closeDialog(id)
          }}
        />
      ),
    })

    return id
  }

  const openDeletePersonDialog = (items: PersonType[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: PersonType) => (
            <div key={item.name} className='mb-5'>
              <h3 className='text-md font-semibold'>{item.name}</h3>
              <p className='text-xs'>
                Data de nascimento: {formatDate(item.birth_at)}
              </p>
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

  const openEditAddressSheet = (
    personId: number,
    addressItem: PersonAddress
  ) => {
    formAddress.reset({
      id: addressItem.id,
      street: addressItem.street,
      number: addressItem.number,
      complement: addressItem.complement,
      district: addressItem.district,
      city: addressItem.city,
      state: addressItem.state,
      person_id: personId,
      postal_code: addressItem.postal_code,
      reference: addressItem.reference,
      type_id: addressItem.type_id,
      country_id: addressItem.country_id,
    })

    const sheetId = openSheet({
      title: addressItem.id ? 'Editar Endereço' : 'Adicionar Novo Endereço',
      description: addressItem.id
        ? 'Edite as informações do endereço.'
        : 'Insira os dados do novo endereço.',
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'type_id',
              label: { text: 'Tipo de Endereço' },
              type: EnumFieldType.SELECT,
              required: true,
              options: addressTypes,
              defaultValue: formAddress.watch('type_id'),
            },
            {
              name: 'street',
              label: { text: 'Rua' },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: addressItem.street,
            },
            {
              name: 'number',
              label: { text: 'Número' },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: addressItem.number,
            },
            {
              name: 'complement',
              label: { text: 'Complemento' },
              type: EnumFieldType.TEXT,
              required: false,
              defaultValue: addressItem.complement,
            },
            {
              name: 'reference',
              label: { text: 'Referência' },
              type: EnumFieldType.TEXT,
              required: false,
              defaultValue: addressItem.reference,
            },
            {
              name: 'district',
              label: { text: 'Bairro' },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: addressItem.district,
            },
            {
              name: 'city',
              label: { text: 'Cidade' },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: addressItem.city,
            },
            {
              name: 'state',
              label: { text: 'Estado' },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: addressItem.state,
            },
            {
              name: 'country_id',
              label: { text: 'País' },
              type: EnumFieldType.SELECT,
              required: true,
              options: countries,
            },
            {
              name: 'postal_code',
              label: { text: 'Código Postal' },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: addressItem.postal_code,
            },
          ]}
          form={formAddress as any}
        />
      ),
      buttons: [
        {
          text: 'Aplicar',
          onClick: () => {
            const addressDataFilled = formAddress.getValues()

            if (addressDataFilled.id) {
              editAddress({
                personId: Number(personId),
                addressId: String(addressItem.id),
                data: {
                  ...addressDataFilled,
                  number: Number(addressDataFilled.number),
                },
              })
            } else {
              delete (addressDataFilled as any).id
              createAddress({
                personId: Number(personId),
                data: {
                  ...addressDataFilled,
                  number: Number(addressDataFilled.number),
                },
              })
            }
            closeSheet(sheetId)
          },
        },
      ],
    })
  }

  const openDeleteAddressDialog = (item: PersonAddress, sheetId: string) => {
    const id = openDialog({
      children: () => (
        <AddressCard
          address={item}
          className='my-2 w-full rounded-2xl border-2 border-blue-500 p-2'
        />
      ),
      title: 'Excluir Endereço',
      description: 'Tem certeza de que deseja deletar este endereço?',
      buttons: [
        {
          variant: 'secondary',
          text: 'Cancelar',
          onClick: () => {
            closeDialog(id)
          },
        },
        {
          text: 'Deletar',
          variant: 'destructive',
          onClick: () => {
            deleteAddress({
              personId: formAddress.getValues().id,
              addressId: String(item.id),
            })
            closeDialog(id)
            closeSheet(sheetId)
          },
        },
      ],
    })

    return id
  }

  const openEditPersonDialog = (item: PersonType) => {
    formPerson.reset({
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
                      label: { text: 'Tipo de Pessoa' },
                      type: EnumFieldType.SELECT,
                      required: true,
                      options: personTypes,
                      defaultValue: formPerson.watch('type_id'),
                    },
                    {
                      name: 'birth_at',
                      label: { text: 'Data de Nascimento' },
                      type: EnumFieldType.DATEPICKER,
                      required: true,
                    },
                  ]}
                  form={formPerson}
                  onSubmit={(data: PersonType) => {
                    editPerson({
                      id: String(data.id),
                      data: {
                        ...data,
                        type_id: Number(data.type_id),
                      },
                    })
                    closeSheet(id)
                  }}
                />
              ),
            },
            {
              title: 'Endereços',
              children: (
                <div className='h-full w-full'>
                  {item.person_addresses?.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      onClick={() => openEditAddressSheet(item.id, address)}
                      onDelete={() => openDeleteAddressDialog(address, id)}
                      className='my-2 rounded-2xl border-2 border-blue-500 p-2'
                      manageable
                    />
                  ))}
                  {!Boolean(item.person_addresses?.length) && (
                    <span className='my-2 flex justify-center text-sm'>
                      Nenhum endereço cadastrado.
                    </span>
                  )}
                  <Button
                    className='absolute bottom-5 right-5 min-w-2 rounded-full p-2'
                    onClick={() =>
                      openEditAddressSheet(item.id, formAddressDefaultValues)
                    }
                  >
                    <IconPlus />
                  </Button>
                </div>
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
          <Card
            className='w-full rounded-lg border-none'
            onClick={() => openEditPersonDialog(item)}
          >
            <CardHeader className='flex flex-row rounded-t-lg px-4 py-3 text-white'>
              <div className='h-10 w-10 rounded-full bg-white' />
              <div className='flex flex-col px-4' style={{ marginTop: 0 }}>
                <CardTitle className='text-md font-semibold'>
                  {item.name}
                </CardTitle>
                <div className='flex flex-row'>
                  <IconClock className='mr-0.5 h-4 w-4 text-white' />
                  <h4 className='text-xs font-normal'>
                    Cadastrado {timeSince(String(item.created_at))}
                  </h4>
                </div>
              </div>
            </CardHeader>
            <CardContent className='px-4 py-2'>
              <div className='my-3  flex items-center'>
                <IconCalendarClock className='text-white-500 mr-3 h-5 w-5' />
                <span className='text-white-800 text-sm font-normal'>
                  {formatDate(item.birth_at)}
                </span>
              </div>
              {item.person_addresses &&
                Boolean(item.person_addresses.length) &&
                item.person_addresses.map((a) => <AddressCard address={a} />)}

              {item.person_contacts &&
                Boolean(item.person_contacts.length) &&
                item.person_contacts.map((c) => <ContactCard contact={c} />)}

              {item.person_documents &&
                Boolean(item.person_documents.length) &&
                item.person_documents.map((d) => <DocumentCard document={d} />)}
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
              if (items.length === 1) openEditPersonDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: 'Excluir',
            variant: 'destructive',
            tooltip: 'Excluir as pessoas selecionados',
            handler: openDeletePersonDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: 'Criar',
            variant: 'default',
            tooltip: 'Criar novo pessoa',
            handler: openCreatePersonDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
