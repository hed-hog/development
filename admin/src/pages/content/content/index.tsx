import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useContentDelete } from '@/features/content/content'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { Content } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { format } from 'date-fns'
import { Calendar, FileText, SquareChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ContentCreatePanel from './components/content-create-panel'
import ContentUpdatePanel from './components/content-update-panel'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Content[]>([])
  const { mutate: deleteContent } = useContentDelete()
  const { openSheet, confirm, closeSheet } = useApp()

  const { t } = useTranslation(['modules', 'actions', 'fields', 'translation'])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'content.content' }),
      description: t('createText', { ns: 'content.content' }),
      children: () => <ContentCreatePanel onCreated={() => closeSheet(id)} />,
    })

    return id
  }

  const openDelete = (items: Content[]) => {
    return confirm({
      title: `${t('delete', { ns: 'content.content' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'content.content' }),
    })
      .then(() =>
        deleteContent(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: Content) => {
    const id = openSheet({
      children: () => (
        <ContentUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'content.content' }),
      description: t('editText', { ns: 'content.content' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('content', { ns: 'modules' })} />
      <DataPanel
        url='/content'
        layout='grid'
        id='content'
        selectable
        hasSearch
        responsiveColumns={{
          default: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 3,
        }}
        render={(item: Content) => (
          <div key={item.id} className='group overflow-hidden'>
            <div className='mb-4 flex items-start justify-between'>
              <div className='rounded-lg bg-primary/10 p-3 transition-colors group-hover:bg-primary/20'>
                <FileText className='h-6 w-6 text-primary' />
              </div>
              <div className='mb-2 flex items-center text-sm text-muted-foreground'>
                <SquareChevronRight className='mr-2 h-4 w-4' />
                <span className='truncate'>{item.slug}</span>
              </div>
            </div>
            <h2 className='mb-2 line-clamp-2 text-xl font-semibold'>
              {item.title}
            </h2>

            <div className='flex items-center text-sm text-muted-foreground'>
              <Calendar className='mr-2 h-4 w-4' />
              <span>
                {t('updated', { ns: 'translation' })}{' '}
                {format(
                  new Date(item?.updated_at ?? ''),
                  t('dateFormat', { ns: 'translation' })
                )}
              </span>
            </div>
          </div>
        )}
        selected={selectedItems as Content[]}
        multiple
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'content.content' }),
            handler: (items: Content[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'content.content' }),
            variant: 'destructive',
            handler: (items: Content[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'content.content' }),
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
