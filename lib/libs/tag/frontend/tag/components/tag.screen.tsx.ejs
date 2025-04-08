import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useTagDelete } from '@/features/tag/tag';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { Tag } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TagCreatePanel from './components/tag-create-panel';
import TagUpdatePanel from './components/tag-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Tag[]>([]);
  const { mutate: deleteTag } = useTagDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(['tag.tag', 'modules', 'actions', 'fields']);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'tag.tag' }),
      description: t('createText', { ns: 'tag.tag' }),
      children: () => <TagCreatePanel onCreated={() => closeSheet(id)} />
    });

    return id;
  };

  const openDelete = (items: Tag[]) => {
    return confirm({
      title: `${t('delete', { ns: 'tag.tag' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'tag.tag' })
    })
      .then(() =>
        deleteTag(items.map((item) => item.id).filter((id) => id !== undefined))
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Tag) => {
    const id = openSheet({
      children: () => (
        <TagUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'tag.tag' }),
      description: t('editText', { ns: 'tag.tag' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('tag', { ns: 'modules' })} />
      <DataPanel
        url="/tag"
        layout="table"
        id="tag"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('tag.slug', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'name',
            header: t('tag.name', { ns: 'fields' }),
            isLocale: true
          }
        ]}
        selected={selectedItems as Tag[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'tag.tag' }),
            handler: (items: Tag[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'tag.tag' }),
            variant: 'destructive',
            handler: (items: Tag[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'tag.tag' }),
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
