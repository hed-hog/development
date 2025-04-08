import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { useContentDelete } from '@/features/content/content';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { Content } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContentCreatePanel from './components/content-create-panel';
import ContentUpdatePanel from './components/content-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Content[]>([]);
  const { mutate: deleteContent } = useContentDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'content.content',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'content.content' }),
      description: t('createText', { ns: 'content.content' }),
      children: () => <ContentCreatePanel onCreated={() => closeSheet(id)} />
    });

    return id;
  };

  const openDelete = (items: Content[]) => {
    return confirm({
      title: `${t('delete', { ns: 'content.content' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'content.content' })
    })
      .then(() =>
        deleteContent(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Content) => {
    const id = openSheet({
      children: () => (
        <ContentUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t('edit', { ns: 'content.content' }),
      description: t('editText', { ns: 'content.content' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('content', { ns: 'modules' })} />
      <DataPanel
        url="/content"
        layout="table"
        id="content"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('content.slug', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'title',
            header: t('content.title', { ns: 'fields' }),
            isLocale: true
          }
        ]}
        selected={selectedItems as Content[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'content.content' }),
            handler: (items: Content[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'content.content' }),
            variant: 'destructive',
            handler: (items: Content[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'content.content' }),
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
