import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useStockExchangeDelete } from '@/features/cbc/stock-exchange';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { StockExchange } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StockExchangeCreatePanel from './components/stock-exchange-create-panel';
import StockExchangeUpdatePanel from './components/stock-exchange-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<StockExchange[]>([]);
  const { mutate: deleteStockExchange } = useStockExchangeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'cbc.stock-exchange',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'cbc.stock-exchange' }),
      description: t('createText', { ns: 'cbc.stock-exchange' }),
      children: () => (
        <StockExchangeCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: StockExchange[]) => {
    return confirm({
      title: `${t('delete', { ns: 'cbc.stock-exchange' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'cbc.stock-exchange' })
    })
      .then(() =>
        deleteStockExchange(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: StockExchange) => {
    const id = openSheet({
      children: () => (
        <StockExchangeUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'cbc.stock-exchange' }),
      description: t('editText', { ns: 'cbc.stock-exchange' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('stock_exchange', { ns: 'modules' })} />
      <DataPanel
        url="/stock-exchange"
        layout="table"
        id="stock-exchange"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'name',
            header: t('stock_exchange.name', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as StockExchange[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'cbc.stock-exchange' }),
            handler: (items: StockExchange[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'cbc.stock-exchange' }),
            variant: 'destructive',
            handler: (items: StockExchange[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'cbc.stock-exchange' }),
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
