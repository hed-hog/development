import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useMailSentDelete } from '@/features/mail-manager/mail-sent'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { MailSent } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MailSentCreatePanel from './components/mail-sent-create-panel'
import MailSentUpdatePanel from './components/mail-sent-update-panel'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Copy } from 'lucide-react'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<MailSent[]>([])
  const { mutate: deleteMailSent } = useMailSentDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'mail-manager.mail-sent',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'mail-manager.mail-sent' }),
      description: t('createText', { ns: 'mail-manager.mail-sent' }),
      children: () => <MailSentCreatePanel onCreated={() => closeSheet(id)} />,
    })

    return id
  }

  const openDelete = (items: MailSent[]) => {
    return confirm({
      title: `${t('delete', { ns: 'mail-manager.mail-sent' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'mail-manager.mail-sent' }),
    })
      .then(() =>
        deleteMailSent(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: MailSent) => {
    const id = openSheet({
      children: () => (
        <MailSentUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'mail-manager.mail-sent' }),
      description: t('editText', { ns: 'mail-manager.mail-sent' }),
    })

    return id
  }

  const [isExpanded, setIsExpanded] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <PageTitle title={t('mail_sent', { ns: 'modules' })} />
      <DataPanel
        url='/mail-sent'
        layout='grid'
        id='Mail'
        selectable
        responsiveColumns={{
          default: 1,
          sm: 1,
          md: 1,
          lg: 1,
          xl: 2,
        }}
        render={(item: MailSent) => (
          <Card className='w-full max-w-2xl shadow-md'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-xl font-semibold'>
                {item.subject}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-5 px-6'>
              <div className='rounded-lg bg-muted/40 p-4'>
                <div className='mb-4'>
                  <h3 className='mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                    Subject
                  </h3>
                  <div className='group flex items-center justify-between'>
                    <p className='text-sm font-medium'>{item.subject}</p>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => copyToClipboard(String(item.subject))}
                      className='h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100'
                    >
                      <Copy className='h-3.5 w-3.5' />
                      <span className='sr-only'>Copy subject</span>
                    </Button>
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div>
                    <h3 className='mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                      From
                    </h3>
                    <div className='group flex items-center justify-between'>
                      <p className='truncate text-sm'>{item.from}</p>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => copyToClipboard(String(item.from))}
                        className='h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100'
                      >
                        <Copy className='h-3.5 w-3.5' />
                        <span className='sr-only'>Copy from</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className='mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                      To
                    </h3>
                    <div className='group flex items-center justify-between'>
                      <p className='truncate text-sm'>{item.to}</p>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => copyToClipboard(String(item.to))}
                        className='h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100'
                      >
                        <Copy className='h-3.5 w-3.5' />
                        <span className='sr-only'>Copy to</span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className='mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                      {item.cc ? 'CC' : item.bcc ? 'BCC' : ''}
                    </h3>
                    {item.cc && (
                      <div className='group flex items-center justify-between'>
                        <p className='truncate text-sm'>{item.cc}</p>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => copyToClipboard(String(item.cc))}
                          className='h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100'
                        >
                          <Copy className='h-3.5 w-3.5' />
                          <span className='sr-only'>Copy cc</span>
                        </Button>
                      </div>
                    )}
                    {!item.cc && item.bcc && (
                      <div className='group flex items-center justify-between'>
                        <p className='truncate text-sm'>{item.bcc}</p>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => copyToClipboard(String(item.bcc))}
                          className='h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100'
                        >
                          <Copy className='h-3.5 w-3.5' />
                          <span className='sr-only'>Copy bcc</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {item.cc && item.bcc && (
                  <div className='mt-4'>
                    <h3 className='mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                      BCC
                    </h3>
                    <div className='group flex items-center justify-between'>
                      <p className='truncate text-sm'>{item.bcc}</p>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => copyToClipboard(String(item.bcc))}
                        className='h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100'
                      >
                        <Copy className='h-3.5 w-3.5' />
                        <span className='sr-only'>Copy bcc</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className='mb-2 flex items-center justify-between'>
                  <h3 className='text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                    Body
                  </h3>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => copyToClipboard(item.body)}
                    className='h-7 px-2 text-xs'
                  >
                    <Copy className='mr-1 h-3.5 w-3.5' />
                    <span>Copy</span>
                  </Button>
                </div>
                <div
                  className={`overflow-hidden ${isExpanded ? '' : 'max-h-32'} relative`}
                >
                  <pre className='whitespace-pre-wrap rounded-lg border border-muted bg-muted/50 p-4 text-sm'>
                    {item.body}
                  </pre>
                  {!isExpanded && item.body.length > 100 && (
                    <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent' />
                  )}
                </div>
              </div>
            </CardContent>
            {item.body.length > 100 && (
              <CardFooter className='px-6 pb-4 pt-0'>
                <Button
                  variant='outline'
                  size='sm'
                  className='flex w-full items-center gap-1 text-xs'
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className='h-3.5 w-3.5' />
                      <span>Show less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className='h-3.5 w-3.5' />
                      <span>Show more</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            )}
          </Card>
        )}
        selected={selectedItems as MailSent[]}
        multiple
        hasSearch
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'mail-manager.mail-sent' }),
            handler: (items: MailSent[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'mail-manager.mail-sent' }),
            variant: 'destructive',
            handler: (items: MailSent[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'mail-manager.mail-sent' }),
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
