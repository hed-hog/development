import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { usePaymentCardBrandDelete } from '@/features/payment/payment-card-brand';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { PaymentCardBrand } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PaymentCardBrandCreatePanel from './components/payment-card-brand-create-panel';
import PaymentCardBrandUpdatePanel from './components/payment-card-brand-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PaymentCardBrand[]>([]);
  const { mutate: deletePaymentCardBrand } = usePaymentCardBrandDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'payment.payment-card-brand',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'payment.payment-card-brand' }),
      description: t('createText', { ns: 'payment.payment-card-brand' }),
      children: () => (
        <PaymentCardBrandCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: PaymentCardBrand[]) => {
    return confirm({
      title: `${t('delete', { ns: 'payment.payment-card-brand' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'payment.payment-card-brand' })
    })
      .then(() =>
        deletePaymentCardBrand(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PaymentCardBrand) => {
    const id = openSheet({
      children: () => (
        <PaymentCardBrandUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'payment.payment-card-brand' }),
      description: t('editText', { ns: 'payment.payment-card-brand' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('payment_card_brand', { ns: 'modules' })} />
      <DataPanel
        url="/payment-card-brand"
        layout="table"
        id="payment-card-brand"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('payment_card_brand.slug', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'name',
            header: t('payment_card_brand.name', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as PaymentCardBrand[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'payment.payment-card-brand' }),
            handler: (items: PaymentCardBrand[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'payment.payment-card-brand' }),
            variant: 'destructive',
            handler: (items: PaymentCardBrand[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'payment.payment-card-brand' }),
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
