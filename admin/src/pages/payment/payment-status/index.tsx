import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { usePaymentStatusDelete } from '@/features/payment/payment-status';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { PaymentStatus } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PaymentStatusCreatePanel from './components/payment-status-create-panel';
import PaymentStatusUpdatePanel from './components/payment-status-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PaymentStatus[]>([]);
  const { mutate: deletePaymentStatus } = usePaymentStatusDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'payment.payment-status',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'payment.payment-status' }),
      description: t('createText', { ns: 'payment.payment-status' }),
      children: () => (
        <PaymentStatusCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: PaymentStatus[]) => {
    return confirm({
      title: `${t('delete', { ns: 'payment.payment-status' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'payment.payment-status' })
    })
      .then(() =>
        deletePaymentStatus(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PaymentStatus) => {
    const id = openSheet({
      children: () => (
        <PaymentStatusUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'payment.payment-status' }),
      description: t('editText', { ns: 'payment.payment-status' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('payment_status', { ns: 'modules' })} />
      <DataPanel
        url="/payment-status"
        layout="table"
        id="payment-status"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('payment_status.slug', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'name',
            header: t('payment_status.name', { ns: 'fields' }),
            isLocale: true
          }
        ]}
        selected={selectedItems as PaymentStatus[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'payment.payment-status' }),
            handler: (items: PaymentStatus[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'payment.payment-status' }),
            variant: 'destructive',
            handler: (items: PaymentStatus[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'payment.payment-status' }),
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
