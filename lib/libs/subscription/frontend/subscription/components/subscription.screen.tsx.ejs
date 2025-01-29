import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useSubscriptionDelete } from '@/features/subscription/subscription';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { Subscription } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SubscriptionCreatePanel from './components/subscription-create-panel';
import SubscriptionUpdatePanel from './components/subscription-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Subscription[]>([]);
  const { mutate: deleteSubscription } = useSubscriptionDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'subscription.subscription',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'subscription.subscription' }),
      description: t('createText', { ns: 'subscription.subscription' }),
      children: () => (
        <SubscriptionCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: Subscription[]) => {
    return confirm({
      title: `${t('delete', { ns: 'subscription.subscription' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'subscription.subscription' })
    })
      .then(() =>
        deleteSubscription(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Subscription) => {
    const id = openSheet({
      children: () => (
        <SubscriptionUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'subscription.subscription' }),
      description: t('editText', { ns: 'subscription.subscription' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('subscription', { ns: 'modules' })} />
      <DataPanel
        url="/subscription"
        layout="table"
        id="subscription"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'status',
            header: t('subscription.status', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'limit',
            header: t('subscription.limit', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'name',
            header: t('subscription.name', { ns: 'fields' }),
            isLocale: true
          }
        ]}
        selected={selectedItems as Subscription[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'subscription.subscription' }),
            handler: (items: Subscription[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'subscription.subscription' }),
            variant: 'destructive',
            handler: (items: Subscription[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'subscription.subscription' }),
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
