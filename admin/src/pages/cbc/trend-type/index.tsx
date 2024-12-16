import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useTrendTypeDelete } from '@/features/cbc/trend-type';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { TrendType } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TrendTypeCreatePanel from './components/trend-type-create-panel';
import TrendTypeUpdatePanel from './components/trend-type-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<TrendType[]>([]);
  const { mutate: deleteTrendType } = useTrendTypeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'cbc.trend-type',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'cbc.trend-type' }),
      description: t('createText', { ns: 'cbc.trend-type' }),
      children: () => <TrendTypeCreatePanel onCreated={() => closeSheet(id)} />
    });

    return id;
  };

  const openDelete = (items: TrendType[]) => {
    return confirm({
      title: `${t('delete', { ns: 'cbc.trend-type' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'cbc.trend-type' })
    })
      .then(() =>
        deleteTrendType(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: TrendType) => {
    const id = openSheet({
      children: () => (
        <TrendTypeUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'cbc.trend-type' }),
      description: t('editText', { ns: 'cbc.trend-type' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('trend_type', { ns: 'modules' })} />
      <DataPanel
        url="/trend-type"
        layout="table"
        id="trend-type"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('trend_type.slug', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'name',
            header: t('trend_type.name', { ns: 'fields' }),
            isLocale: true
          }
        ]}
        selected={selectedItems as TrendType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'cbc.trend-type' }),
            handler: (items: TrendType[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'cbc.trend-type' }),
            variant: 'destructive',
            handler: (items: TrendType[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'cbc.trend-type' }),
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
