import { PageTitle } from '@/components/custom/page-title'
import DataPanel from '@/components/panels/data-panel'
import { usePaymentCouponDelete } from '@/features/payment/payment-coupon'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import { PaymentCoupon } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PaymentCouponCreatePanel from './components/payment-coupon-create-panel'
import PaymentCouponUpdatePanel from './components/payment-coupon-update-panel'

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PaymentCoupon[]>([])
  const { mutate: deletePaymentCoupon } = usePaymentCouponDelete()
  const { openSheet, confirm, closeSheet } = useApp()
  const { t } = useTranslation([
    'payment.payment-coupon',
    'modules',
    'actions',
    'fields',
  ])

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'payment.payment-coupon' }),
      description: t('createText', { ns: 'payment.payment-coupon' }),
      children: () => (
        <PaymentCouponCreatePanel onCreated={() => closeSheet(id)} />
      ),
    })

    return id
  }

  const openDelete = (items: PaymentCoupon[]) => {
    return confirm({
      title: `${t('delete', { ns: 'payment.payment-coupon' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'payment.payment-coupon' }),
    })
      .then(() =>
        deletePaymentCoupon(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items))
  }

  const openUpdate = (item: PaymentCoupon) => {
    const id = openSheet({
      children: () => (
        <PaymentCouponUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'payment.payment-coupon' }),
      description: t('editText', { ns: 'payment.payment-coupon' }),
    })

    return id
  }

  return (
    <>
      <PageTitle title={t('payment_coupon', { ns: 'modules' })} />
      <DataPanel
        url='/payment-coupon'
        layout='table'
        id='payment-coupon'
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'code',
            header: t('payment_coupon.code', { ns: 'fields' }),
            isLocale: false,
          },

          {
            key: 'description',
            header: t('payment_coupon.description', { ns: 'fields' }),
            isLocale: false,
          },

          {
            key: 'value',
            header: t('payment_coupon.value', { ns: 'fields' }),
            isLocale: false,
          },

          {
            key: 'active',
            header: t('payment_coupon.active', { ns: 'fields' }),
            isLocale: false,
          },

          {
            key: 'uses_limit',
            header: t('payment_coupon.uses_limit', { ns: 'fields' }),
            isLocale: false,
          },

          {
            key: 'uses_qtd',
            header: t('payment_coupon.uses_qtd', { ns: 'fields' }),
            isLocale: false,
          },

          {
            key: 'starts_at',
            header: t('payment_coupon.starts_at', { ns: 'fields' }),
            isLocale: false,
          },

          {
            key: 'ends_at',
            header: t('payment_coupon.ends_at', { ns: 'fields' }),
            isLocale: false,
          },
        ]}
        selected={selectedItems as PaymentCoupon[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'payment.payment-coupon' }),
            handler: (items: PaymentCoupon[]) => {
              if (items.length === 1) openUpdate(items[0])
            },
            show: 'once',
          },
          {
            icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'payment.payment-coupon' }),
            variant: 'destructive',
            handler: (items: PaymentCoupon[]) => {
              openDelete(items)
            },
            show: 'some',
          },
          {
            icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'payment.payment-coupon' }),
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
