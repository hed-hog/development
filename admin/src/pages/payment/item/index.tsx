import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useItemDelete } from '@/features/payment/item';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { Item } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ItemCreatePanel from './components/item-create-panel';
import ItemUpdatePanel from './components/item-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const { mutate: deleteItem } = useItemDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'payment.item',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'payment.item' }),
      description: t('createText', { ns: 'payment.item' }),
      children: () => <ItemCreatePanel onCreated={() => closeSheet(id)} />
    });

    return id;
  };

  const openDelete = (items: Item[]) => {
    return confirm({
      title: `${t('delete', { ns: 'payment.item' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'payment.item' })
    })
      .then(() =>
        deleteItem(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Item) => {
    const id = openSheet({
      children: () => (
        <ItemUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'payment.item' }),
      description: t('editText', { ns: 'payment.item' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('item', { ns: 'modules' })} />
      <DataPanel
        url="/item"
        layout="table"
        id="item"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('item.slug', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'name',
            header: t('item.name', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'price',
            header: t('item.price', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as Item[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'payment.item' }),
            handler: (items: Item[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'payment.item' }),
            variant: 'destructive',
            handler: (items: Item[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'payment.item' }),
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
