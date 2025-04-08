import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useCategoryDelete } from '@/features/category/category'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { Category } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { format } from 'date-fns'
import { Calendar, FileText, SquareChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CategoryCreatePanel from './components/category-create-panel'
import CategoryUpdatePanel from './components/category-update-panel'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Category[]>([])
  const { mutate: deleteCategory } = useCategoryDelete()
  const { openSheet, confirm, closeSheet } = useApp()

  const { t } = useTranslation(['modules', 'actions', 'fields', 'translation'])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'category.category' }),
      description: t('createText', { ns: 'category.category' }),
      children: () => <CategoryCreatePanel onCreated={() => closeSheet(id)} />,
    })

    return id
  }

  const openDelete = (items: Category[]) => {
    return confirm({
      title: `${t('delete', { ns: 'category.category' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'category.category' }),
    })
      .then(() =>
        deleteCategory(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: Category) => {
    const id = openSheet({
      children: () => (
        <CategoryUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'category.category' }),
      description: t('editText', { ns: 'category.category' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('category', { ns: 'modules' })} />
      <DataPanel
        url='/category'
        layout='grid'
        id='category'
        selectable
        hasSearch
        responsiveColumns={{
          default: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 3,
        }}
        render={(item: Category) => (
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
              {item.name}
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
        selected={selectedItems as Category[]}
        multiple
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'category.category' }),
            handler: (items: Category[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'category.category' }),
            variant: 'destructive',
            handler: (items: Category[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'category.category' }),
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
