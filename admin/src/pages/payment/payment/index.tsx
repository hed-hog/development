import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { usePaymentDelete } from '@/features/payment/payment'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { Payment } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PaymentCreatePanel from './components/payment-create-panel'
import PaymentUpdatePanel from './components/payment-update-panel'
import PaymentCard from '@/components/cards/payment-card'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Payment[]>([])
  const { mutate: deletePayment } = usePaymentDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'payment.payment',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'payment.payment' }),
      description: t('createText', { ns: 'payment.payment' }),
      children: () => <PaymentCreatePanel onCreated={() => closeSheet(id)} />,
    })

    return id
  }

  const openDelete = (items: Payment[]) => {
    return confirm({
      title: `${t('delete', { ns: 'payment.payment' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'payment.payment' }),
    })
      .then(() =>
        deletePayment(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: Payment) => {
    const id = openSheet({
      children: () => (
        <PaymentUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'payment.payment' }),
      description: t('editText', { ns: 'payment.payment' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('payment', { ns: 'modules' })} />
      <DataPanel
        url='/payment'
        layout='grid'
        id='payment'
        selectable
        render={(item: Payment) => <PaymentCard item={item} />}
        responsiveColumns={{
          default: 1,
          sm: 2,
          md: 1,
          lg: 2,
          xl: 3,
        }}
        selected={selectedItems as Payment[]}
        multiple
        hasSearch
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'payment.payment' }),
            handler: (items: Payment[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'payment.payment' }),
            variant: 'destructive',
            handler: (items: Payment[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'payment.payment' }),
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
