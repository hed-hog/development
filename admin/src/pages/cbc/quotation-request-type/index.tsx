import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useQuotationRequestTypeDelete } from '@/features/cbc/quotation-request-type';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { QuotationRequestType } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QuotationRequestTypeCreatePanel from './components/quotation-request-type-create-panel';
import QuotationRequestTypeUpdatePanel from './components/quotation-request-type-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<QuotationRequestType[]>(
    []
  );
  const { mutate: deleteQuotationRequestType } =
    useQuotationRequestTypeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'cbc.quotation-request-type',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'cbc.quotation-request-type' }),
      description: t('createText', { ns: 'cbc.quotation-request-type' }),
      children: () => (
        <QuotationRequestTypeCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: QuotationRequestType[]) => {
    return confirm({
      title: `${t('delete', { ns: 'cbc.quotation-request-type' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'cbc.quotation-request-type' })
    })
      .then(() =>
        deleteQuotationRequestType(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: QuotationRequestType) => {
    const id = openSheet({
      children: () => (
        <QuotationRequestTypeUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'cbc.quotation-request-type' }),
      description: t('editText', { ns: 'cbc.quotation-request-type' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('quotation_request_type', { ns: 'modules' })} />
      <DataPanel
        url="/quotation-request-type"
        layout="table"
        id="quotation-request-type"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'name',
            header: t('quotation_request_type.name', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'headers',
            header: t('quotation_request_type.headers', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'filters',
            header: t('quotation_request_type.filters', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as QuotationRequestType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'cbc.quotation-request-type' }),
            handler: (items: QuotationRequestType[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'cbc.quotation-request-type' }),
            variant: 'destructive',
            handler: (items: QuotationRequestType[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'cbc.quotation-request-type' }),
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
