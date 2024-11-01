import AddressCard from '@/components/cards/address-card'
import ContactCard from '@/components/cards/contact-card'
import CustomCard from '@/components/cards/custom-card'
import DocumentCard from '@/components/cards/document-card'
import DataPanel from '@/components/panels/data-panel'
import FormPanel from '@/components/panels/form-panel'
import { TabPanel } from '@/components/panels/tab-panel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EnumFieldType } from '@/enums/EnumFieldType'
import {
  useAddressCreate,
  useAddressDelete,
  useAddressUpdate,
} from '@/features/address'
import { useAddressType } from '@/features/address-type'
import {
  useCreateContact,
  useDeleteContact,
  useEditContact,
} from '@/features/contact'
import { useContactType } from '@/features/contact-type'
import { useCountry } from '@/features/country'
import {
  useCreateCustom,
  useDeleteCustom,
  useEditCustom,
} from '@/features/custom'
import { useCustomType } from '@/features/custom-type'
import {
  useCreateDocument,
  useDeleteDocument,
  useEditDocument,
} from '@/features/document'
import { useDocumentType } from '@/features/document-type'
import {
  useCreatePerson,
  useDeletePerson,
  useEditPerson,
} from '@/features/person'
import { useApp } from '@/hooks/use-app'
import { formatDate } from '@/lib/date-string'
import { IFormFieldOption } from '@/types/form-panel'
import {
  Person,
  PersonAddress,
  PersonContact,
  PersonCustom,
  PersonDocument,
} from '@/types/models'
import {
  IconCalendarClock,
  IconClock,
  IconEdit,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'
import { format, formatDistance, Locale } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
export default function Page() {
  const formAddressDefaultValues: PersonAddress = {
    id: 0,
    street: '',
    number: '0',
    country_id: 24,
    complement: '',
    district: '',
    city: '',
    state: '',
    postal_code: '',
    reference: '',
    type_id: 1,
    person_id: 0,
  }

  const formContactDefaultValues: PersonContact = {
    id: 0,
    type_id: 1,
    primary: false,
    value: '',
    person_id: 0,
  }

  const formPersonDefaultValues: Person = {
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
    person_id: 0,
  }

  const [selectedItems, setSelectedItems] = useState<Person[]>([])
  const [addressTypes, setAddressTypes] = useState<IFormFieldOption[]>([])
  const [persons, setPersons] = useState<IFormFieldOption[]>([])
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
  const { mutate: deletePerson } = useDeletePerson()
  const { mutate: createAddress } = useAddressCreate()
  const { mutate: editAddress } = useAddressUpdate()
  const { mutate: deleteAddress } = useAddressDelete()
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
  const { data: addressTypeData } = useAddressType()
  const { data: contactTypeData } = useContactType()
  const { data: customTypeData } = useCustomType()
  const { data: documentTypeData } = useDocumentType()
  const { data: personData } = usePerson()
  const { data: countriesData } = useCountry()

  const {
    i18n: { language },
  } = useTranslation()
  const { t: modulesT } = useTranslation('modules')
  const { t: actionsT } = useTranslation('actions')
  const { t: personT } = useTranslation('person')
  const { t: addressT } = useTranslation('address')
  const { t: contactsT } = useTranslation('contacts')
  const { t: documentsT } = useTranslation('documents')
  const { t: customsT } = useTranslation('customs')
  const { t: userT } = useTranslation('user')

  const locale: { [key: string]: Locale } = {
    en: enUS,
    pt: ptBR,
  }

  const formatDateToUTC = (date: Date) => {
    const utcDate = new Date(date.toUTCString())
    if (date.getHours() >= 21) {
      utcDate.setUTCDate(utcDate.getUTCDate() + 1)
    }
    return format(utcDate, 'P', { locale: locale[language] })
  }

  useEffect(() => {
    if (!personData) return
    const persons = ((personData?.data as any).data ?? []).map(
      (type: { id: number; name: string }) => ({
        value: String(type.id),
        label: type.name,
      })
    )
    setPersons(persons)
  }, [personData])

  useEffect(() => {
    if (!addressTypeData) return
    const addressTypes = ((addressTypeData?.data as any).data ?? []).map(
      (type: { id: number; name: string }) => ({
        value: String(type.id),
        label: type.name,
      })
    )
    setAddressTypes(addressTypes)
  }, [addressTypeData])

  useEffect(() => {
    if (!contactTypeData) return
    const contactTypes = ((contactTypeData?.data as any).data ?? []).map(
      (type: { id: number; name: string }) => ({
        value: String(type.id),
        label: type.name,
      })
    )
    setContactTypes(contactTypes)
  }, [contactTypeData])

  useEffect(() => {
    if (!customTypeData) return
    const customTypes = ((customTypeData?.data as any).data ?? []).map(
      (type: { id: number; name: string }) => ({
        value: String(type.id),
        label: type.name,
      })
    )
    setCustomTypes(customTypes)
  }, [customTypeData])

  useEffect(() => {
    if (!documentTypeData) return
    const documentTypes = ((documentTypeData?.data as any).data ?? []).map(
      (type: { id: number; name: string }) => ({
        value: String(type.id),
        label: type.name,
      })
    )
    setDocumentTypes(documentTypes)
  }, [documentTypeData])

  useEffect(() => {
    if (!countriesData) return
    const countries = ((countriesData.data as any) ?? []).map(
      (country: { id: number; name: string }) => ({
        value: String(country.id),
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
      title: personT('create'),
      description: personT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'name',
              label: { text: personT('name') },
              type: EnumFieldType.TEXT,
              required: true,
            },
            {
              name: 'type_id',
              label: { text: personT('type') },
              type: EnumFieldType.SELECT,
              required: true,
              options: persons,
            },
            {
              name: 'birth_at',
              label: { text: personT('birthDate') },
              type: EnumFieldType.DATEPICKER,
              required: true,
            },
          ]}
          form={formPerson}
          button={{ text: actionsT('create') }}
          onSubmit={(data: Person) => {
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

  const openDeletePersonDialog = (items: Person[]) => {
    const id = openDialog({
      children: () => (
        <div className='flex flex-col'>
          {items.map((item: Person) => (
            <div key={item.name} className='mb-5'>
              <h3 className='text-md font-semibold'>{item.name}</h3>
              <p className='text-xs'>
                {personT('birthDate')}: {formatDate(item.birth_at)}
              </p>
            </div>
          ))}
        </div>
      ),
      title: personT('delete'),
      description: personT('deleteText'),
      buttons: [
        {
          name: 'cancel',
          text: actionsT('cancel'),
          variant: 'secondary',
          onClick: () => {
            setSelectedItems(items)
            closeDialog(id)
          },
        },
        {
          name: 'delete',
          text: actionsT('delete'),
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
      title: addressItem.id ? addressT('edit') : addressT('create'),
      description: addressItem.id
        ? addressT('editTooltip')
        : addressT('createTooltip'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'type_id',
              label: { text: addressT('type') },
              type: EnumFieldType.SELECT,
              required: true,
              options: addressTypes,
              defaultValue: formAddress.watch('type_id'),
            },
            {
              name: 'street',
              label: { text: addressT('street') },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: addressItem.street,
            },
            {
              name: 'number',
              label: { text: addressT('number') },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: addressItem.number,
            },
            {
              name: 'complement',
              label: { text: addressT('complement') },
              type: EnumFieldType.TEXT,
              required: false,
              defaultValue: addressItem.complement,
            },
            {
              name: 'reference',
              label: { text: addressT('reference') },
              type: EnumFieldType.TEXT,
              required: false,
              defaultValue: addressItem.reference,
            },
            {
              name: 'district',
              label: { text: addressT('district') },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: addressItem.district,
            },
            {
              name: 'city',
              label: { text: addressT('city') },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: addressItem.city,
            },
            {
              name: 'state',
              label: { text: addressT('state') },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: addressItem.state,
            },
            {
              name: 'country_id',
              label: { text: addressT('country') },
              type: EnumFieldType.SELECT,
              required: true,
              options: countries,
            },
            {
              name: 'postal_code',
              label: { text: addressT('postalCode') },
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
          name: 'save',
          text: actionsT('apply'),
          onClick: () => {
            const addressDataFilled = formAddress.getValues()

            if (addressDataFilled.id) {
              editAddress({
                personId: Number(personId),
                addressId: String(addressItem.id),
                data: {
                  ...addressDataFilled,
                  country_id: Number(addressDataFilled.country_id),
                  number: Number(addressDataFilled.number),
                },
              })
            } else {
              delete (addressDataFilled as any).id
              createAddress({
                personId: Number(personId),
                data: {
                  ...addressDataFilled,
                  country_id: Number(addressDataFilled.country_id),
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
      title: addressT('delete'),
      description: addressT('deleteText'),
      buttons: [
        {
          name: 'cancel',
          variant: 'secondary',
          text: actionsT('cancel'),
          onClick: () => {
            closeDialog(id)
          },
        },
        {
          name: 'delete',
          text: actionsT('delete'),
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
      title: contactItem.id ? contactsT('edit') : contactsT('create'),
      description: contactItem.id
        ? contactsT('editTooltip')
        : contactsT('createTooltip'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'type_id',
              label: { text: contactsT('type') },
              type: EnumFieldType.SELECT,
              required: true,
              options: contactTypes,
              defaultValue: formContact.watch('type_id'),
            },
            {
              name: 'value',
              label: { text: contactsT('value') },
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
          name: 'save',
          text: actionsT('apply'),
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
      title: contactsT('delete'),
      description: contactsT('deleteText'),
      buttons: [
        {
          name: 'cancel',
          text: actionsT('cancel'),
          variant: 'secondary',
          onClick: () => {
            closeDialog(id)
          },
        },
        {
          name: 'delete',
          text: actionsT('delete'),
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
      title: documentItem.id ? documentsT('edit') : documentsT('create'),
      description: documentItem.id
        ? documentsT('editText')
        : documentsT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'type_id',
              label: { text: documentsT('type') },
              type: EnumFieldType.SELECT,
              required: true,
              options: documentTypes,
              defaultValue: formDocument.watch('type_id'),
            },
            {
              name: 'country_id',
              label: { text: documentsT('country') },
              type: EnumFieldType.SELECT,
              required: true,
              options: countries,
              defaultValue: documentItem.country_id,
            },
            {
              name: 'value',
              label: { text: documentsT('value') },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: documentItem.value,
            },
            {
              name: 'issued_at',
              label: { text: documentsT('issuedDate') },
              type: EnumFieldType.DATEPICKER,
              required: false,
              defaultValue: documentItem.issued_at,
            },
            {
              name: 'expiry_at',
              label: { text: documentsT('expiryDate') },
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
          name: 'save',
          text: actionsT('apply'),
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
      title: documentsT('delete'),
      description: documentsT('deleteText'),
      buttons: [
        {
          name: 'cancel',
          text: actionsT('cancel'),
          variant: 'secondary',
          onClick: () => {
            closeDialog(id)
          },
        },
        {
          name: 'delete',
          text: actionsT('delete'),
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
      title: customItem.id ? customsT('edit') : customsT('create'),
      description: customItem.id
        ? customsT('editText')
        : customsT('createText'),
      children: () => (
        <FormPanel
          fields={[
            {
              name: 'type_id',
              label: { text: customsT('type') },
              type: EnumFieldType.SELECT,
              required: true,
              options: customTypes,
              defaultValue: formCustom.watch('type_id'),
            },
            {
              name: 'name',
              label: { text: customsT('name') },
              type: EnumFieldType.TEXT,
              required: true,
              defaultValue: customItem.name,
            },
            {
              name: 'value',
              label: { text: customsT('value') },
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
          name: 'save',
          text: actionsT('apply'),
          onClick: () => {
            const customDataFilled = formCustom.getValues()

            if (customDataFilled.id) {
              editCustom({
                personId: Number(personId),
                customId: String(customItem.id),
                data: {
                  ...customDataFilled,
                  type_id: Number(customDataFilled.type_id),
                },
              })
            } else {
              delete (customDataFilled as any).id
              createCustom({
                personId: Number(personId),
                data: {
                  ...customDataFilled,
                  type_id: Number(customDataFilled.type_id),
                },
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
      title: customsT('delete'),
      description: customsT('deleteText'),
      buttons: [
        {
          name: 'cancel',
          text: actionsT('cancel'),
          variant: 'secondary',
          onClick: () => {
            closeDialog(id)
          },
        },
        {
          name: 'delete',
          text: actionsT('delete'),
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

  const openEditPersonDialog = (item: Person) => {
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
              title: actionsT('details'),
              buttons: [
                {
                  name: 'save',
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
                      label: { text: personT('name') },
                      type: EnumFieldType.TEXT,
                      required: false,
                    },
                    {
                      name: 'type_id',
                      label: { text: personT('type') },
                      type: EnumFieldType.SELECT,
                      required: true,
                      options: persons,
                      defaultValue: formPerson.watch('type_id'),
                    },
                    {
                      name: 'birth_at',
                      label: { text: personT('birthDate') },
                      type: EnumFieldType.DATEPICKER,
                      required: true,
                    },
                  ]}
                  form={formPerson}
                  onSubmit={(data: Person) => {
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
              title: modulesT('contacts'),
              children: (
                <div className='h-full w-full'>
                  {item.person_contact?.map((contact) => (
                    <ContactCard
                      key={contact.id}
                      contact={contact}
                      className='my-2 rounded-2xl border-2 border-blue-500 p-2'
                      onClick={() => openEditContactSheet(item.id, contact)}
                      onDelete={() => openDeleteContactDialog(contact, id)}
                      manageable
                    />
                  ))}
                  {!Boolean(item.person_contact?.length) && (
                    <span className='my-2 flex justify-center text-sm'>
                      {contactsT('noneRegistered')}
                    </span>
                  )}
                  <Button
                    className='absolute bottom-5 right-5 min-w-2 rounded-full p-2'
                    onClick={() =>
                      openEditContactSheet(item.id, formContactDefaultValues)
                    }
                    name='add-contact'
                  >
                    <IconPlus />
                  </Button>
                </div>
              ),
            },
            {
              title: modulesT('documents'),
              children: (
                <div className='h-full w-full'>
                  {item.person_document?.map((document) => (
                    <DocumentCard
                      key={document.id}
                      document={document}
                      className='my-2 rounded-2xl border-2 border-blue-500 p-2'
                      onClick={() => openEditDocumentSheet(item.id, document)}
                      onDelete={() => openDeleteDocumentDialog(document, id)}
                      manageable
                    />
                  ))}
                  {!Boolean(item.person_document?.length) && (
                    <span className='my-2 flex justify-center text-sm'>
                      {documentsT('noneRegistered')}
                    </span>
                  )}
                  <Button
                    className='absolute bottom-5 right-5 min-w-2 rounded-full p-2'
                    onClick={() =>
                      openEditDocumentSheet(item.id, formDocumentDefaultValues)
                    }
                    name='add-document'
                  >
                    <IconPlus />
                  </Button>
                </div>
              ),
            },
            {
              title: modulesT('address'),
              children: (
                <div className='h-full w-full'>
                  {item.person_address?.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      onClick={() => openEditAddressSheet(item.id, address)}
                      onDelete={() => openDeleteAddressDialog(address, id)}
                      className='my-2 rounded-2xl border-2 border-blue-500 p-2'
                      manageable
                    />
                  ))}
                  {!Boolean(item.person_address?.length) && (
                    <span className='my-2 flex justify-center text-sm'>
                      {addressT('noneRegistered')}
                    </span>
                  )}
                  <Button
                    className='absolute bottom-5 right-5 min-w-2 rounded-full p-2'
                    onClick={() =>
                      openEditAddressSheet(item.id, formAddressDefaultValues)
                    }
                    name='add-address'
                  >
                    <IconPlus />
                  </Button>
                </div>
              ),
            },
            {
              title: modulesT('customs'),
              children: (
                <div className='h-full w-full'>
                  {item.person_custom?.map((custom) => (
                    <CustomCard
                      key={custom.id}
                      custom={custom}
                      onClick={() => openEditCustomSheet(item.id, custom)}
                      onDelete={() => openDeleteCustomDialog(custom, id)}
                      className='my-2 rounded-2xl border-2 border-blue-500 p-2'
                      manageable
                    />
                  ))}
                  {!Boolean(item.person_custom?.length) && (
                    <span className='my-2 flex justify-center text-sm'>
                      {customsT('noneRegistered')}
                    </span>
                  )}
                  <Button
                    className='absolute bottom-5 right-5 min-w-2 rounded-full p-2'
                    onClick={() =>
                      openEditCustomSheet(item.id, formCustomDefaultValues)
                    }
                    name='add-custom'
                  >
                    <IconPlus />
                  </Button>
                </div>
              ),
            },
          ]}
        />
      ),
      title: personT('edit'),
      description: personT('editText'),
    })

    return id
  }

  return (
    <>
      <Helmet>
        <title>{modulesT('contacts')} - Hedhog</title>
      </Helmet>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {modulesT('contacts')}
          </h1>
        </div>
      </div>

      <DataPanel
        url='/person'
        layout='grid'
        id='person'
        selectable
        onItemDoubleClick={(item) => openEditPersonDialog(item)}
        render={(item: Person) => (
          <Card className='w-full rounded-lg border-none'>
            <CardHeader className='flex flex-row rounded-t-lg px-4 py-3'>
              <Avatar>
                <AvatarImage src='' alt={item.name} />
                <AvatarFallback>
                  {item.name.substring(0, 2).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col px-4' style={{ marginTop: 0 }}>
                <CardTitle className='text-md font-semibold'>
                  {item.name}
                </CardTitle>
                <div className='flex flex-row'>
                  <IconClock className='mr-0.5 h-4 w-4' />
                  <h4 className='text-xs font-normal'>
                    {userT('registered')}{' '}
                    {formatDistance(
                      new Date(String(item.created_at)),
                      new Date(),
                      { addSuffix: true, locale: locale[language] }
                    )}
                  </h4>
                </div>
              </div>
            </CardHeader>
            <CardContent className='px-4 py-2'>
              <div className='my-3  flex items-center'>
                <IconCalendarClock className='text-white-500 mr-3 h-5 w-5' />
                <span className='text-white-800 text-sm font-normal'>
                  {formatDateToUTC(new Date(item.birth_at))}
                </span>
              </div>
              {item.person_address &&
                Boolean(item.person_address.length) &&
                item.person_address.map((a) => <AddressCard address={a} />)}

              {item.person_contact &&
                Boolean(item.person_contact.length) &&
                item.person_contact.map((c) => <ContactCard contact={c} />)}

              {item.person_document &&
                Boolean(item.person_document.length) &&
                item.person_document.map((d) => <DocumentCard document={d} />)}

              {item.person_custom &&
                Boolean(item.person_custom) &&
                item.person_custom?.map((c) => <CustomCard custom={c} />)}
            </CardContent>
          </Card>
        )}
        selected={selectedItems as Person[]}
        multiple
        hasSearch
        responsiveColumns={{ default: 1, sm: 1, md: 1, lg: 2, xl: 4 }}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('edit'),
            tooltip: personT('editTooltip'),
            handler: (items: Person[]) => {
              if (items.length === 1) openEditPersonDialog(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('delete'),
            tooltip: personT('deleteTooltip'),
            variant: 'destructive',
            handler: openDeletePersonDialog,
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: actionsT('create'),
            tooltip: personT('createTooltip'),
            variant: 'default',
            handler: openCreatePersonDialog,
            show: 'none',
          },
        ]}
      />
    </>
  )
}
