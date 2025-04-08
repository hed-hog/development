import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { usePaymentMethodDelete } from '@/features/payment/payment-method';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { PaymentMethod } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PaymentMethodCreatePanel from './components/payment-method-create-panel';
import PaymentMethodUpdatePanel from './components/payment-method-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PaymentMethod[]>([]);
  const { mutate: deletePaymentMethod } = usePaymentMethodDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'payment.payment-method',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'payment.payment-method' }),
      description: t('createText', { ns: 'payment.payment-method' }),
      children: () => (
        <PaymentMethodCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: PaymentMethod[]) => {
    return confirm({
      title: `${t('delete', { ns: 'payment.payment-method' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'payment.payment-method' })
    })
      .then(() =>
        deletePaymentMethod(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PaymentMethod) => {
    const id = openSheet({
      children: () => (
        <PaymentMethodUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'payment.payment-method' }),
      description: t('editText', { ns: 'payment.payment-method' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('payment_method', { ns: 'modules' })} />
      <DataPanel
        url="/payment-method"
        layout="table"
        id="payment-method"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('payment_method.slug', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'name',
            header: t('payment_method.name', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as PaymentMethod[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'payment.payment-method' }),
            handler: (items: PaymentMethod[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'payment.payment-method' }),
            variant: 'destructive',
            handler: (items: PaymentMethod[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'payment.payment-method' }),
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
