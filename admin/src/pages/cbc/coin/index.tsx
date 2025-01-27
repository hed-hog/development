import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useCoinDelete } from '@/features/cbc/coin';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { Coin } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CoinCreatePanel from './components/coin-create-panel';
import CoinUpdatePanel from './components/coin-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Coin[]>([]);
  const { mutate: deleteCoin } = useCoinDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(['cbc.coin', 'modules', 'actions', 'fields']);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'cbc.coin' }),
      description: t('createText', { ns: 'cbc.coin' }),
      children: () => <CoinCreatePanel onCreated={() => closeSheet(id)} />
    });

    return id;
  };

  const openDelete = (items: Coin[]) => {
    return confirm({
      title: `${t('delete', { ns: 'cbc.coin' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'cbc.coin' })
    })
      .then(() =>
        deleteCoin(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Coin) => {
    const id = openSheet({
      children: () => (
        <CoinUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'cbc.coin' }),
      description: t('editText', { ns: 'cbc.coin' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('coin', { ns: 'modules' })} />
      <DataPanel
        url="/coin"
        layout="table"
        id="coin"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'name',
            header: t('coin.name', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'slug',
            header: t('coin.slug', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as Coin[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'cbc.coin' }),
            handler: (items: Coin[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'cbc.coin' }),
            variant: 'destructive',
            handler: (items: Coin[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'cbc.coin' }),
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
