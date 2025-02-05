import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { usePaymentDelete } from '@/features/payment/payment';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { Payment } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PaymentCreatePanel from './components/payment-create-panel';
import PaymentUpdatePanel from './components/payment-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Payment[]>([]);
  const { mutate: deletePayment } = usePaymentDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'payment.payment',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'payment.payment' }),
      description: t('createText', { ns: 'payment.payment' }),
      children: () => <PaymentCreatePanel onCreated={() => closeSheet(id)} />
    });

    return id;
  };

  const openDelete = (items: Payment[]) => {
    return confirm({
      title: `${t('delete', { ns: 'payment.payment' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'payment.payment' })
    })
      .then(() =>
        deletePayment(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Payment) => {
    const id = openSheet({
      children: () => (
        <PaymentUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'payment.payment' }),
      description: t('editText', { ns: 'payment.payment' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('payment', { ns: 'modules' })} />
      <DataPanel
        url="/payment"
        layout="table"
        id="payment"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('payment.slug', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'amount',
            header: t('payment.amount', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'document',
            header: t('payment.document', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'payment_at',
            header: t('payment.payment_at', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'currency',
            header: t('payment.currency', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'installments',
            header: t('payment.installments', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'delivered',
            header: t('payment.delivered', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'discount',
            header: t('payment.discount', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as Payment[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'payment.payment' }),
            handler: (items: Payment[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'payment.payment' }),
            variant: 'destructive',
            handler: (items: Payment[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'payment.payment' }),
            variant: 'default',
            handler: () => {
              openCreate();
            },
            show: 'none'
          }
        ]}
      />
    </>
  );
}
