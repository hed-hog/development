import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { usePaymentGatewayDelete } from '@/features/payment/payment-gateway';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { PaymentGateway } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PaymentGatewayCreatePanel from './components/payment-gateway-create-panel';
import PaymentGatewayUpdatePanel from './components/payment-gateway-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PaymentGateway[]>([]);
  const { mutate: deletePaymentGateway } = usePaymentGatewayDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'payment.payment-gateway',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'payment.payment-gateway' }),
      description: t('createText', { ns: 'payment.payment-gateway' }),
      children: () => (
        <PaymentGatewayCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: PaymentGateway[]) => {
    return confirm({
      title: `${t('delete', { ns: 'payment.payment-gateway' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'payment.payment-gateway' })
    })
      .then(() =>
        deletePaymentGateway(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PaymentGateway) => {
    const id = openSheet({
      children: () => (
        <PaymentGatewayUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'payment.payment-gateway' }),
      description: t('editText', { ns: 'payment.payment-gateway' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('payment_gateway', { ns: 'modules' })} />
      <DataPanel
        url="/payment-gateway"
        layout="table"
        id="payment-gateway"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('payment_gateway.slug', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'name',
            header: t('payment_gateway.name', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as PaymentGateway[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'payment.payment-gateway' }),
            handler: (items: PaymentGateway[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'payment.payment-gateway' }),
            variant: 'destructive',
            handler: (items: PaymentGateway[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'payment.payment-gateway' }),
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
