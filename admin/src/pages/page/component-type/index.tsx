import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useComponentTypeDelete } from '@/features/page/component-type'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { ComponentType } from '@/types/models'
import { IconClock, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { formatDistance, Locale } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ComponentTypeCreatePanel from './components/component-type-create-panel'
import ComponentTypeUpdatePanel from './components/component-type-update-panel'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<ComponentType[]>([])
  const { mutate: deleteComponentType } = useComponentTypeDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t: userT } = useTranslation('users')
  const {
    i18n: { language },
  } = useTranslation()

  const locale: { [key: string]: Locale } = {
    en: enUS,
    pt: ptBR,
  }

  const { t } = useTranslation(['modules', 'actions', 'fields'])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'page.component-type' }),
      description: t('createText', { ns: 'page.component-type' }),
      children: () => (
        <ComponentTypeCreatePanel onCreated={() => closeSheet(id)} />
      ),
    })

    return id
  }

  const openDelete = (items: ComponentType[]) => {
    return confirm({
      title: `${t('delete', { ns: 'page.component-type' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'page.component-type' }),
    })
      .then(() =>
        deleteComponentType(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: ComponentType) => {
    const id = openSheet({
      children: () => (
        <ComponentTypeUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'page.component-type' }),
      description: t('editText', { ns: 'page.component-type' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('page_component_type', { ns: 'modules' })} />
      <DataPanel
        url='/ComponentType'
        layout='grid'
        id='ComponentType'
        selectable
        hasSearch
        responsiveColumns={{
          default: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 3,
        }}
        render={(item: ComponentType) => (
          <Card className='w-full rounded-none border-none bg-none'>
            <CardHeader className='flex flex-row rounded-t-lg px-4 py-3'>
              <Avatar>
                <AvatarImage src='' alt={item.slug} />
                <AvatarFallback>
                  {item.slug.substring(0, 2).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col px-4' style={{ marginTop: 0 }}>
                <CardTitle className='text-md font-semibold'>
                  {item.slug}
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
            <CardContent className='px-4 py-2'></CardContent>
          </Card>
        )}
        selected={selectedItems as ComponentType[]}
        multiple
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'page.component-type' }),
            handler: (items: ComponentType[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'page.component-type' }),
            variant: 'destructive',
            handler: (items: ComponentType[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'page.component-type' }),
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
