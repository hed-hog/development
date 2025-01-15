import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useBankingDelete } from '@/features/cbc/banking';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { Banking } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BankingCreatePanel from './components/banking-create-panel';
import BankingUpdatePanel from './components/banking-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Banking[]>([]);
  const { mutate: deleteBanking } = useBankingDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(['cbc.banking', 'modules', 'actions', 'fields']);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'cbc.banking' }),
      description: t('createText', { ns: 'cbc.banking' }),
      children: () => <BankingCreatePanel onCreated={() => closeSheet(id)} />
    });

    return id;
  };

  const openDelete = (items: Banking[]) => {
    return confirm({
      title: `${t('delete', { ns: 'cbc.banking' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'cbc.banking' })
    })
      .then(() =>
        deleteBanking(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Banking) => {
    const id = openSheet({
      children: () => (
        <BankingUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'cbc.banking' }),
      description: t('editText', { ns: 'cbc.banking' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('banking', { ns: 'modules' })} />
      <DataPanel
        url="/banking"
        layout="table"
        id="banking"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'name',
            header: t('banking.name', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'balance',
            header: t('banking.balance', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as Banking[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'cbc.banking' }),
            handler: (items: Banking[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'cbc.banking' }),
            variant: 'destructive',
            handler: (items: Banking[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'cbc.banking' }),
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
