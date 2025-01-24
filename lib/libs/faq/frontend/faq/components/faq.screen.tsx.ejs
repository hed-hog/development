import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useFaqDelete } from '@/features/faq/faq'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { Faq } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FaqCreatePanel from './components/faq-create-panel'
import FaqUpdatePanel from './components/faq-update-panel'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Faq[]>([])
  const { mutate: deleteFaq } = useFaqDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation(['faq.faq', 'modules', 'actions', 'fields'])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'faq.faq' }),
      description: t('createText', { ns: 'faq.faq' }),
      children: () => <FaqCreatePanel onCreated={() => closeSheet(id)} />,
    })

    return id
  }

  const openDelete = (items: Faq[]) => {
    return confirm({
      title: `${t('delete', { ns: 'faq.faq' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'faq.faq' }),
    })
      .then(() =>
        deleteFaq(items.map((item) => item.id).filter((id) => id !== undefined))
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: Faq) => {
    const id = openSheet({
      children: () => (
        <FaqUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'faq.faq' }),
      description: t('editText', { ns: 'faq.faq' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('faq', { ns: 'modules' })} />
      <DataPanel
        url='/faq'
        layout='table'
        id='faq'
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },
          {
            key: 'question',
            header: t('question', { ns: 'fields' }),
            isLocale: true,
          },
          {
            key: 'answer',
            header: t('answer', { ns: 'fields' }),
            isLocale: true,
          },
        ]}
        selected={selectedItems as Faq[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'faq.faq' }),
            handler: (items: Faq[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'faq.faq' }),
            variant: 'destructive',
            handler: (items: Faq[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'faq.faq' }),
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
