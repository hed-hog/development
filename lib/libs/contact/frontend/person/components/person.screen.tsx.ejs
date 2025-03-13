import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { usePersonDelete } from '@/features/contact/person'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { Person } from '@/types/models'
import { IconClock, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PersonCreatePanel from './components/person-create-panel'
import PersonUpdatePanel from './components/person-update-panel'
import ContactCard from '@/components/cards/contact-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistance, Locale } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import AddressCard from '@/components/cards/address-card'
import DocumentCard from '@/components/cards/document-card'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Person[]>([])
  const { mutate: deletePerson } = usePersonDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t: userT } = useTranslation('users')
  const {
    i18n: { language },
  } = useTranslation()

  const locale: { [key: string]: Locale } = {
    en: enUS,
    pt: ptBR,
  }

  const { t } = useTranslation([
    'contact.person',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'contact.person' }),
      description: t('createText', { ns: 'contact.person' }),
      children: () => <PersonCreatePanel onCreated={() => closeSheet(id)} />,
    })

    return id
  }

  const openDelete = (items: Person[]) => {
    return confirm({
      title: `${t('delete', { ns: 'contact.person' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'contact.person' }),
    })
      .then(() =>
        deletePerson(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: Person) => {
    const id = openSheet({
      children: () => (
        <PersonUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'contact.person' }),
      description: t('editText', { ns: 'contact.person' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('person', { ns: 'modules' })} />
      <DataPanel
        url='/person'
        layout='grid'
        id='person'
        selectable
        hasSearch
        responsiveColumns={{
          default: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 3,
        }}
        render={(item: Person) => (
          <Card className='w-full rounded-none border-none bg-none'>
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
              {item.person_address &&
                Boolean(item.person_address.length) &&
                item.person_address.map((a) => <AddressCard address={a} />)}

              {item.person_contact &&
                Boolean(item.person_contact.length) &&
                item.person_contact.map((c) => <ContactCard contact={c} />)}

              {item.person_document &&
                Boolean(item.person_document.length) &&
                item.person_document.map((d) => <DocumentCard document={d} />)}
            </CardContent>
          </Card>
        )}
        selected={selectedItems as Person[]}
        multiple
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'contact.person' }),
            handler: (items: Person[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'contact.person' }),
            variant: 'destructive',
            handler: (items: Person[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'contact.person' }),
            variant: 'default',
            handler: () => {
              openCreate()
            },
            show: 'none',
          },
        ]}
      />
    </>
  )
}
