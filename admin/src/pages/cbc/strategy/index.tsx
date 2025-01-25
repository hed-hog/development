import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useStrategyDelete } from '@/features/cbc/strategy';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { Strategy } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StrategyCreatePanel from './components/strategy-create-panel';
import StrategyUpdatePanel from './components/strategy-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Strategy[]>([]);
  const { mutate: deleteStrategy } = useStrategyDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'cbc.strategy',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'cbc.strategy' }),
      description: t('createText', { ns: 'cbc.strategy' }),
      children: () => <StrategyCreatePanel onCreated={() => closeSheet(id)} />
    });

    return id;
  };

  const openDelete = (items: Strategy[]) => {
    return confirm({
      title: `${t('delete', { ns: 'cbc.strategy' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'cbc.strategy' })
    })
      .then(() =>
        deleteStrategy(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Strategy) => {
    const id = openSheet({
      children: () => (
        <StrategyUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'cbc.strategy' }),
      description: t('editText', { ns: 'cbc.strategy' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('strategy', { ns: 'modules' })} />
      <DataPanel
        url="/strategy"
        layout="table"
        id="strategy"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'name',
            header: t('strategy.name', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as Strategy[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'cbc.strategy' }),
            handler: (items: Strategy[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'cbc.strategy' }),
            variant: 'destructive',
            handler: (items: Strategy[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'cbc.strategy' }),
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
