import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useRatingDelete } from '@/features/rating/rating';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { Rating } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RatingCreatePanel from './components/rating-create-panel';
import RatingUpdatePanel from './components/rating-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Rating[]>([]);
  const { mutate: deleteRating } = useRatingDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'rating.rating',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'rating.rating' }),
      description: t('createText', { ns: 'rating.rating' }),
      children: () => <RatingCreatePanel onCreated={() => closeSheet(id)} />
    });

    return id;
  };

  const openDelete = (items: Rating[]) => {
    return confirm({
      title: `${t('delete', { ns: 'rating.rating' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'rating.rating' })
    })
      .then(() =>
        deleteRating(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Rating) => {
    const id = openSheet({
      children: () => (
        <RatingUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'rating.rating' }),
      description: t('editText', { ns: 'rating.rating' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('rating', { ns: 'modules' })} />
      <DataPanel
        url="/rating"
        layout="table"
        id="rating"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'comment',
            header: t('rating.comment', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'note',
            header: t('rating.note', { ns: 'fields' }),
            isLocale: false
          }
        ]}
        selected={selectedItems as Rating[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'rating.rating' }),
            handler: (items: Rating[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'rating.rating' }),
            variant: 'destructive',
            handler: (items: Rating[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'rating.rating' }),
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
