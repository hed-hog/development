import AddressCard from '@/components/custom/address-card'
import { Button } from '@/components/custom/button'
import ContactCard from '@/components/custom/contact-card'
import CustomCard from '@/components/custom/custom-card'
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
import {
  useCreateContact,
  useDeleteContact,
  useEditContact,
} from '@/features/contact'
import { useContactTypes } from '@/features/contact-types'
import { useCountries } from '@/features/country'
import {
  useCreateCustom,
  useDeleteCustom,
  useEditCustom,
} from '@/features/custom'
import { useCustomTypes } from '@/features/custom-types'
import {
  useCreateDocument,
  useDeleteDocument,
  useEditDocument,
} from '@/features/document'
import { useDocumentTypes } from '@/features/document-types'
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
import { PersonContact } from '@/types/contact'
import { PersonCustom } from '@/types/custom'
import { PersonDocument } from '@/types/document'
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
  const formAddressDefaultValues: PersonAddress = {
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

  const formContactDefaultValues: PersonContact = {
    id: 0,
    type_id: 1,
    primary: false,
    value: '',
  }

  const formPersonDefaultValues: PersonType = {
    id: 0,
    name: '',
    type_id: 0,
    birth_at: String(new Date()),
  }

  const formDocumentDefaultValues: PersonDocument = {
    id: 0,
    type_id: 1,
    value: '',
    issued_at: '',
    country_id: 24,
    expiry_at: '',
  }

  const formCustomDefaultValues: PersonCustom = {
    id: 0,
    type_id: 1,
    name: '',
    value: '',
  }

  const [selectedItems, setSelectedItems] = useState<PersonType[]>([])
  const [addressTypes, setAddressTypes] = useState<IFormFieldOption[]>([])
  const [personTypes, setPersonTypes] = useState<IFormFieldOption[]>([])
  const [contactTypes, setContactTypes] = useState<IFormFieldOption[]>([])
  const [customTypes, setCustomTypes] = useState<IFormFieldOption[]>([])
  const [documentTypes, setDocumentTypes] = useState<IFormFieldOption[]>([])
  const [countries, setCountries] = useState<IFormFieldOption[]>([])
  const formEdit = useRef<any>(null)

  const formPerson = useForm<FieldValues>({
    defaultValues: formPersonDefaultValues,
    mode: 'onChange',
  })

  const formAddress = useForm<PersonAddress>({
    defaultValues: formAddressDefaultValues,
    mode: 'onChange',
  })

  const formContact = useForm<PersonContact>({
    defaultValues: formContactDefaultValues,
    mode: 'onChange',
  })

  const formDocument = useForm<PersonDocument>({
    defaultValues: formDocumentDefaultValues,
    mode: 'onChange',
  })

  const formCustom = useForm<PersonCustom>({
    defaultValues: formCustomDefaultValues,
    mode: 'onChange',
  })

  const { mutate: createPerson } = useCreatePerson()
  const { mutate: editPerson } = useEditPerson()
  const { mutate: deletePersons } = useDeletePerson()
  const { mutate: createAddress } = useCreateAddress()
  const { mutate: editAddress } = useEditAddress()
  const { mutate: deleteAddress } = useDeleteAddress()
  const { mutate: createContact } = useCreateContact()
  const { mutate: editContact } = useEditContact()
  const { mutate: deleteContact } = useDeleteContact()
  const { mutate: createCustom } = useCreateCustom()
  const { mutate: editCustom } = useEditCustom()
  const { mutate: deleteCustom } = useDeleteCustom()
  const { mutate: createDocument } = useCreateDocument()
  const { mutate: editDocument } = useEditDocument()
  const { mutate: deleteDocument } = useDeleteDocument()
  const { openDialog, closeDialog, openSheet, closeSheet } = useApp()
  const { data: addressTypeData } = useAddressTypes()
  const { data: contactTypeData } = useContactTypes()
  const { data: customTypeData } = useCustomTypes()
  const { data: documentTypeData } = useDocumentTypes()
  const { data: personTypeData } = usePersonTypes()
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
    if (!contactTypeData) return
    const contactTypes = (contactTypeData?.data as any).data.map(
      (type: { id: number; name: string }) => ({
        value: type.id,
        label: type.name,
      })
    )
    setContactTypes(contactTypes)
  }, [contactTypeData])

  useEffect(() => {
    if (!customTypeData) return
    const customTypes = (customTypeData?.data as any).data.map(
      (type: { id: number; name: string }) => ({
        value: type.id,
        label: type.name,
      })
    )
    setCustomTypes(customTypes)
  }, [customTypeData])

  useEffect(() => {
    if (!documentTypeData) return
    const documentTypes = (documentTypeData?.data as any).data.map(
      (type: { id: number; name: string }) => ({
        value: type.id,
        label: type.name,
      })
    )
    setDocumentTypes(documentTypes)
  }, [documentTypeData])

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

  const openEditContactSheet = (
    personId: number,
    contactItem: PersonContact
  ) => {
    formContact.reset({
      id: contactItem.id,
      type_id: contactItem.type_id,
      value: contactItem.value,
    })

    const sheetId = openSheet({
      title: contactItem.id ? 'Editar Contato' : 'Adicionar Novo Contato',
      description: contactItem.id
        ? 'Edite as informações do contato.'
        : 'Insira os dados do novo contato.',
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'type_id',
              label: { text: 'Tipo de Contato' },
              type: EnumFieldType.SELECT,
              required: true,
              options: contactTypes,
              defaultValue: formContact.watch('type_id'),
            },
            {
              name: 'value',
              label: { text: 'Valor' },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: contactItem.value,
            },
          ]}
          form={formContact as any}
        />
      ),
      buttons: [
        {
          text: 'Aplicar',
          onClick: () => {
            const contactDataFilled = formContact.getValues()

            if (contactDataFilled.id) {
              editContact({
                personId: Number(personId),
                contactId: String(contactItem.id),
                data: {
                  ...contactDataFilled,
                  type_id: Number(contactDataFilled.type_id),
                },
              })
            } else {
              delete (contactDataFilled as any).id
              createContact({
                personId: Number(personId),
                data: {
                  ...contactDataFilled,
                  type_id: Number(contactDataFilled.type_id),
                },
              })
            }
            closeSheet(sheetId)
          },
        },
      ],
    })
  }

  const openDeleteContactDialog = (item: PersonContact, sheetId: string) => {
    const id = openDialog({
      children: () => (
        <ContactCard
          contact={item}
          className='my-2 w-full rounded-2xl border-2 border-blue-500 p-2'
        />
      ),
      title: 'Excluir Contato',
      description: 'Tem certeza de que deseja deletar este contato?',
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
            deleteContact({
              personId: formContact.getValues().id,
              contactId: String(item.id),
            })
            closeDialog(id)
            closeSheet(sheetId)
          },
        },
      ],
    })

    return id
  }

  const openEditDocumentSheet = (
    personId: number,
    documentItem: PersonDocument
  ) => {
    formDocument.reset({
      id: documentItem.id,
      type_id: documentItem.type_id,
      country_id: documentItem.country_id || 24,
      value: documentItem.value,
      expiry_at: documentItem.expiry_at,
      issued_at: documentItem.issued_at,
    })

    const sheetId = openSheet({
      title: documentItem.id ? 'Editar Documento' : 'Adicionar Novo Documento',
      description: documentItem.id
        ? 'Edite as informações do documento.'
        : 'Insira os dados do novo documento.',
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'type_id',
              label: { text: 'Tipo de Documento' },
              type: EnumFieldType.SELECT,
              required: true,
              options: documentTypes,
              defaultValue: formDocument.watch('type_id'),
            },
            {
              name: 'country_id',
              label: { text: 'País' },
              type: EnumFieldType.SELECT,
              required: true,
              options: countries,
              defaultValue: documentItem.country_id,
            },
            {
              name: 'value',
              label: { text: 'Valor' },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: documentItem.value,
            },
            {
              name: 'issued_at',
              label: { text: 'Data de Emissão' },
              type: EnumFieldType.DATEPICKER,
              required: false,
              defaultValue: documentItem.issued_at,
            },
            {
              name: 'expiry_at',
              label: { text: 'Data de Expiração' },
              type: EnumFieldType.DATEPICKER,
              required: false,
              defaultValue: documentItem.expiry_at,
            },
          ]}
          form={formDocument as any}
        />
      ),
      buttons: [
        {
          text: 'Aplicar',
          onClick: () => {
            const documentDataFilled = formDocument.getValues()

            if (documentDataFilled.id) {
              editDocument({
                personId: Number(personId),
                documentId: String(documentItem.id),
                data: documentDataFilled,
              })
            } else {
              delete (documentDataFilled as any).id
              createDocument({
                personId: Number(personId),
                data: documentDataFilled,
              })
            }
            closeSheet(sheetId)
          },
        },
      ],
    })
  }

  const openDeleteDocumentDialog = (item: PersonDocument, sheetId: string) => {
    const id = openDialog({
      children: () => (
        <DocumentCard
          document={item}
          className='my-2 w-full rounded-2xl border-2 border-blue-500 p-2'
        />
      ),
      title: 'Excluir Documento',
      description: 'Tem certeza de que deseja deletar este documento?',
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
            deleteDocument({
              personId: formDocument.getValues().id,
              documentId: String(item.id),
            })
            closeDialog(id)
            closeSheet(sheetId)
          },
        },
      ],
    })

    return id
  }

  const openEditCustomSheet = (personId: number, customItem: PersonCustom) => {
    formCustom.reset({
      id: customItem.id,
      type_id: customItem.type_id,
      name: customItem.name,
      value: customItem.value,
    })

    const sheetId = openSheet({
      title: customItem.id
        ? 'Editar Atributo Personalizado'
        : 'Adicionar Novo Atributo Personalizado',
      description: customItem.id
        ? 'Edite as informações do atributo personalizado.'
        : 'Insira os dados do novo atributo personalizado.',
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'type_id',
              label: { text: 'Tipo do Atributo' },
              type: EnumFieldType.SELECT,
              required: true,
              options: customTypes,
              defaultValue: formCustom.watch('type_id'),
            },
            {
              name: 'name',
              label: { text: 'Nome' },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: customItem.name,
            },
            {
              name: 'value',
              label: { text: 'Valor' },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: customItem.value,
            },
          ]}
          form={formCustom as any}
        />
      ),
      buttons: [
        {
          text: 'Aplicar',
          onClick: () => {
            const customDataFilled = formCustom.getValues()

            if (customDataFilled.id) {
              editCustom({
                personId: Number(personId),
                customId: String(customItem.id),
                data: customDataFilled,
              })
            } else {
              delete (customDataFilled as any).id
              createCustom({
                personId: Number(personId),
                data: customDataFilled,
              })
            }
            closeSheet(sheetId)
          },
        },
      ],
    })
  }

  const openDeleteCustomDialog = (item: PersonCustom, sheetId: string) => {
    const id = openDialog({
      children: () => (
        <CustomCard
          custom={item}
          className='my-2 w-full rounded-2xl border-2 border-blue-500 p-2'
        />
      ),
      title: 'Excluir Atributo Personalizado',
      description:
        'Tem certeza de que deseja deletar este atributo personalizado?',
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
            deleteCustom({
              personId: formCustom.getValues().id,
              customId: String(item.id),
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
              title: 'Contatos',
              children: (
                <div className='h-full w-full'>
                  {item.person_contacts?.map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      className='my-2 rounded-2xl border-2 border-blue-500 p-2'
                      onClick={() => openEditContactSheet(item.id, contact)}
                      onDelete={() => openDeleteContactDialog(contact, id)}
                      manageable
                    />
                  ))}
                  {!Boolean(item.person_contacts?.length) && (
                    <span className='my-2 flex justify-center text-sm'>
                      Nenhum contato cadastrado.
                    </span>
                  )}
                  <Button
                    className='absolute bottom-5 right-5 min-w-2 rounded-full p-2'
                    onClick={() =>
                      openEditContactSheet(item.id, formContactDefaultValues)
                    }
                  >
                    <IconPlus />
                  </Button>
                </div>
              ),
            },
            {
              title: 'Documentos',
              children: (
                <div className='h-full w-full'>
                  {item.person_documents?.map((document) => (
                    <DocumentCard
                      key={document.id}
                      document={document}
                      className='my-2 rounded-2xl border-2 border-blue-500 p-2'
                      onClick={() => openEditDocumentSheet(item.id, document)}
                      onDelete={() => openDeleteDocumentDialog(document, id)}
                      manageable
                    />
                  ))}
                  {!Boolean(item.person_documents?.length) && (
                    <span className='my-2 flex justify-center text-sm'>
                      Nenhum documento cadastrado.
                    </span>
                  )}
                  <Button
                    className='absolute bottom-5 right-5 min-w-2 rounded-full p-2'
                    onClick={() =>
                      openEditDocumentSheet(item.id, formContactDefaultValues)
                    }
                  >
                    <IconPlus />
                  </Button>
                </div>
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
            {
              title: 'Outros',
              children: (
                <div className='h-full w-full'>
                  {item.person_customs?.map((custom) => (
                    <CustomCard
                      key={custom.id}
                      custom={custom}
                      onClick={() => openEditCustomSheet(item.id, custom)}
                      onDelete={() => openDeleteCustomDialog(custom, id)}
                      className='my-2 rounded-2xl border-2 border-blue-500 p-2'
                      manageable
                    />
                  ))}
                  {!Boolean(item.person_customs?.length) && (
                    <span className='my-2 flex justify-center text-sm'>
                      Nenhum atributo personalizado cadastrado.
                    </span>
                  )}
                  <Button
                    className='absolute bottom-5 right-5 min-w-2 rounded-full p-2'
                    onClick={() =>
                      openEditCustomSheet(item.id, formCustomDefaultValues)
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

              {item.person_customs &&
                Boolean(item.person_customs) &&
                item.person_customs?.map((c) => <CustomCard custom={c} />)}
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
