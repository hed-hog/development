import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useMailVarDelete } from '@/features/mail-manager/mail-var'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { MailVar } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MailVarCreatePanel from './components/mail-var-create-panel'
import MailVarUpdatePanel from './components/mail-var-update-panel'
import { Card } from '@/components/ui/card'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<MailVar[]>([])
  const { mutate: deleteMailVar } = useMailVarDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'mail-manager.mail-var',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'mail-manager.mail-var' }),
      description: t('createText', { ns: 'mail-manager.mail-var' }),
      children: () => <MailVarCreatePanel onCreated={() => closeSheet(id)} />,
    })

    return id
  }

  const openDelete = (items: MailVar[]) => {
    return confirm({
      title: `${t('delete', { ns: 'mail-manager.mail-var' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'mail-manager.mail-var' }),
    })
      .then(() =>
        deleteMailVar(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: MailVar) => {
    const id = openSheet({
      children: () => (
        <MailVarUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'mail-manager.mail-var' }),
      description: t('editText', { ns: 'mail-manager.mail-var' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('mail_var', { ns: 'modules' })} />
      <DataPanel
        url='/mail-var'
        layout='grid'
        id='mail-var'
        selectable
        responsiveColumns={{
          default: 1,
          sm: 1,
          md: 1,
          lg: 3,
          xl: 4,
        }}
        render={(item: MailVar) => (
          <Card className='flex w-full max-w-xs items-center justify-center border border-slate-200 from-slate-50 to-slate-100 p-4 shadow-sm transition-shadow duration-300 hover:shadow-md'>
            <span className='font-mono text-lg font-medium tracking-tight'>
              {item.name}
            </span>
          </Card>
        )}
        selected={selectedItems as MailVar[]}
        multiple
        hasSearch
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'mail-manager.mail-var' }),
            handler: (items: MailVar[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'mail-manager.mail-var' }),
            variant: 'destructive',
            handler: (items: MailVar[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'mail-manager.mail-var' }),
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
