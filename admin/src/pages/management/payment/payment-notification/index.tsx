import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { usePaymentNotificationDelete } from '@/features/payment/payment-notification'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { PaymentNotification } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PaymentNotificationCreatePanel from './components/payment-notification-create-panel'
import PaymentNotificationUpdatePanel from './components/payment-notification-update-panel'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PaymentNotification[]>([])
  const { mutate: deletePaymentNotification } = usePaymentNotificationDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'payment.payment-notification',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = (id: number) => {
    const sheetId = openSheet({
      title: t('create', { ns: 'payment.payment-notification' }),
      description: t('createText', { ns: 'payment.payment-notification' }),
      children: () => (
        <PaymentNotificationCreatePanel
          id={id}
          onCreated={() => closeSheet(sheetId)}
        />
      ),
    })

    return id
  }

  const openDelete = (items: PaymentNotification[]) => {
    return confirm({
      title: `${t('delete', { ns: 'payment.payment-notification' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'payment.payment-notification' }),
    })
      .then(() =>
        deletePaymentNotification({
          id: Number(items[0].id),
          ids: items.map((item) => item.id).filter((id) => id !== undefined),
        })
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: PaymentNotification) => {
    const id = openSheet({
      children: () => (
        <PaymentNotificationUpdatePanel
          id={Number(item.id)}
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'payment.payment-notification' }),
      description: t('editText', { ns: 'payment.payment-notification' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('payment_notification', { ns: 'modules' })} />
      <DataPanel
        url='/payment-notification'
        layout='table'
        id='payment-notification'
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'log',
            header: t('payment_notification.log', { ns: 'fields' }),
            isLocale: false,
          },
        ]}
        selected={selectedItems as PaymentNotification[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'payment.payment-notification' }),
            handler: (items: PaymentNotification[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'payment.payment-notification' }),
            variant: 'destructive',
            handler: (items: PaymentNotification[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'payment.payment-notification' }),
            variant: 'default',
            handler: (items: PaymentNotification[]) => {
              openCreate(Number(items[0].id))
            },
            show: 'none',
          },
        ]}
      />
    </>
  )
}
