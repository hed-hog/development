import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useTradeSignalTypeDelete } from '@/features/cbc/trade-signal-type';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { TradeSignalType } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TradeSignalTypeCreatePanel from './components/trade-signal-type-create-panel';
import TradeSignalTypeUpdatePanel from './components/trade-signal-type-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<TradeSignalType[]>([]);
  const { mutate: deleteTradeSignalType } = useTradeSignalTypeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'cbc.trade-signal-type',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'cbc.trade-signal-type' }),
      description: t('createText', { ns: 'cbc.trade-signal-type' }),
      children: () => (
        <TradeSignalTypeCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: TradeSignalType[]) => {
    return confirm({
      title: `${t('delete', { ns: 'cbc.trade-signal-type' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'cbc.trade-signal-type' })
    })
      .then(() =>
        deleteTradeSignalType(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: TradeSignalType) => {
    const id = openSheet({
      children: () => (
        <TradeSignalTypeUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'cbc.trade-signal-type' }),
      description: t('editText', { ns: 'cbc.trade-signal-type' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('trade_signal_type', { ns: 'modules' })} />
      <DataPanel
        url="/trade-signal-type"
        layout="table"
        id="trade-signal-type"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'name',
            header: t('trade_signal_type.name', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as TradeSignalType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'cbc.trade-signal-type' }),
            handler: (items: TradeSignalType[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'cbc.trade-signal-type' }),
            variant: 'destructive',
            handler: (items: TradeSignalType[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'cbc.trade-signal-type' }),
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
