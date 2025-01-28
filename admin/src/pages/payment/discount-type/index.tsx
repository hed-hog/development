import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useDiscountTypeDelete } from '@/features/payment/discount-type';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { DiscountType } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DiscountTypeCreatePanel from './components/discount-type-create-panel';
import DiscountTypeUpdatePanel from './components/discount-type-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<DiscountType[]>([]);
  const { mutate: deleteDiscountType } = useDiscountTypeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'payment.discount-type',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'payment.discount-type' }),
      description: t('createText', { ns: 'payment.discount-type' }),
      children: () => (
        <DiscountTypeCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: DiscountType[]) => {
    return confirm({
      title: `${t('delete', { ns: 'payment.discount-type' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'payment.discount-type' })
    })
      .then(() =>
        deleteDiscountType(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: DiscountType) => {
    const id = openSheet({
      children: () => (
        <DiscountTypeUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'payment.discount-type' }),
      description: t('editText', { ns: 'payment.discount-type' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('discount_type', { ns: 'modules' })} />
      <DataPanel
        url="/discount-type"
        layout="table"
        id="discount-type"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('discount_type.slug', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'name',
            header: t('discount_type.name', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as DiscountType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'payment.discount-type' }),
            handler: (items: DiscountType[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'payment.discount-type' }),
            variant: 'destructive',
            handler: (items: DiscountType[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'payment.discount-type' }),
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
