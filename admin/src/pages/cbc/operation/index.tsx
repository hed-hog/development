import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useOperationDelete } from '@/features/cbc/operation';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { Operation } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OperationCreatePanel from './components/operation-create-panel';
import OperationUpdatePanel from './components/operation-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Operation[]>([]);
  const { mutate: deleteOperation } = useOperationDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'cbc.operation',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'cbc.operation' }),
      description: t('createText', { ns: 'cbc.operation' }),
      children: () => <OperationCreatePanel onCreated={() => closeSheet(id)} />
    });

    return id;
  };

  const openDelete = (items: Operation[]) => {
    return confirm({
      title: `${t('delete', { ns: 'cbc.operation' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'cbc.operation' })
    })
      .then(() =>
        deleteOperation(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Operation) => {
    const id = openSheet({
      children: () => (
        <OperationUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'cbc.operation' }),
      description: t('editText', { ns: 'cbc.operation' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('operation', { ns: 'modules' })} />
      <DataPanel
        url="/operation"
        layout="table"
        id="operation"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'layers',
            header: t('operation.layers', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'leverage',
            header: t('operation.leverage', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as Operation[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'cbc.operation' }),
            handler: (items: Operation[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'cbc.operation' }),
            variant: 'destructive',
            handler: (items: Operation[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'cbc.operation' }),
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
