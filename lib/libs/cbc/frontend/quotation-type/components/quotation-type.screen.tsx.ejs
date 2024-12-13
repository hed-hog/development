import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useQuotationTypeDelete } from '@/features/cbc/quotation-type';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { QuotationType } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QuotationTypeCreatePanel from './components/quotation-type-create-panel';
import QuotationTypeUpdatePanel from './components/quotation-type-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<QuotationType[]>([]);
  const { mutate: deleteQuotationType } = useQuotationTypeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'cbc.quotation-type',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'cbc.quotation-type' }),
      description: t('createText', { ns: 'cbc.quotation-type' }),
      children: () => (
        <QuotationTypeCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: QuotationType[]) => {
    return confirm({
      title: `${t('delete', { ns: 'cbc.quotation-type' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'cbc.quotation-type' })
    })
      .then(() =>
        deleteQuotationType(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: QuotationType) => {
    const id = openSheet({
      children: () => (
        <QuotationTypeUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'cbc.quotation-type' }),
      description: t('editText', { ns: 'cbc.quotation-type' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('quotation_type', { ns: 'modules' })} />
      <DataPanel
        url="/quotation-type"
        layout="table"
        id="quotation-type"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'name',
            header: t('quotation_type.name', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'headers',
            header: t('quotation_type.headers', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'filters',
            header: t('quotation_type.filters', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as QuotationType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'cbc.quotation-type' }),
            handler: (items: QuotationType[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'cbc.quotation-type' }),
            variant: 'destructive',
            handler: (items: QuotationType[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'cbc.quotation-type' }),
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
