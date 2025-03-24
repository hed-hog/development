import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { useMailDelete } from '@/features/mail-manager/mail'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { Mail } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MailCreatePanel from './components/mail-create-panel'
import MailUpdatePanel from './components/mail-update-panel'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Copy } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Mail[]>([])
  const { mutate: deleteMail } = useMailDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation(['mail-manager.mail', 'modules', 'actions', 'fields'])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'mail-manager.mail' }),
      description: t('createText', { ns: 'mail-manager.mail' }),
      children: () => <MailCreatePanel onCreated={() => closeSheet(id)} />,
    })

    return id
  }

  const openDelete = (items: Mail[]) => {
    return confirm({
      title: `${t('delete', { ns: 'mail-manager.mail' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'mail-manager.mail' }),
    })
      .then(() =>
        deleteMail(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: Mail) => {
    const id = openSheet({
      children: () => (
        <MailUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'mail-manager.mail' }),
      description: t('editText', { ns: 'mail-manager.mail' }),
    })

    return id
  }

  const [isExpanded, setIsExpanded] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <PageTitle title={t('mail', { ns: 'modules' })} />
      <DataPanel
        url='/mail'
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
        render={(item: Mail) => (
          <Card className='w-full max-w-2xl'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xl'>{item.subject}</CardTitle>
                <Badge variant='outline'>{item.slug}</Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h3 className='mb-1 text-sm font-medium text-muted-foreground'>
                  Slug
                </h3>
                <div className='flex items-center justify-between'>
                  <p className='font-mono text-sm'>{item.slug}</p>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => copyToClipboard(item.slug)}
                    className='h-8 w-8'
                  >
                    <Copy className='h-4 w-4' />
                    <span className='sr-only'>Copy slug</span>
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className='mb-1 text-sm font-medium text-muted-foreground'>
                  Subject
                </h3>
                <div className='flex items-center justify-between'>
                  <p>{item.subject}</p>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => copyToClipboard(String(item.subject))}
                    className='h-8 w-8'
                  >
                    <Copy className='h-4 w-4' />
                    <span className='sr-only'>Copy subject</span>
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <div className='mb-1 flex items-center justify-between'>
                  <h3 className='text-sm font-medium text-muted-foreground'>
                    Body
                  </h3>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => copyToClipboard(String(item.body))}
                    className='h-8 w-8'
                  >
                    <Copy className='h-4 w-4' />
                    <span className='sr-only'>Copy body</span>
                  </Button>
                </div>
                <div
                  className={`overflow-hidden ${isExpanded ? '' : 'max-h-24'} relative`}
                >
                  <pre className='whitespace-pre-wrap rounded-md bg-muted p-3 text-sm'>
                    {item.body}
                  </pre>
                  {!isExpanded && item.body && item.body.length > 100 && (
                    <div className='absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent' />
                  )}
                </div>
              </div>
            </CardContent>
            {item.body && item.body.length > 100 && (
              <CardFooter>
                <Button
                  variant='ghost'
                  className='flex w-full items-center gap-1'
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className='h-4 w-4' />
                      <span>Show less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className='h-4 w-4' />
                      <span>Show more</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            )}
          </Card>
        )}
        selected={selectedItems as Mail[]}
        multiple
        hasSearch
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'mail-manager.mail' }),
            handler: (items: Mail[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'mail-manager.mail' }),
            variant: 'destructive',
            handler: (items: Mail[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'mail-manager.mail' }),
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
