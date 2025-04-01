import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { usePersonCustomTypeDelete } from '@/features/contact/person-custom-type';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { PersonCustomType } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PersonCustomTypeCreatePanel from './components/person-custom-type-create-panel';
import PersonCustomTypeUpdatePanel from './components/person-custom-type-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonCustomType[]>([]);
  const { mutate: deletePersonCustomType } = usePersonCustomTypeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'contact.person-custom-type',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'contact.person-custom-type' }),
      description: t('createText', { ns: 'contact.person-custom-type' }),
      children: () => (
        <PersonCustomTypeCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: PersonCustomType[]) => {
    return confirm({
      title: `${t('delete', { ns: 'contact.person-custom-type' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'contact.person-custom-type' })
    })
      .then(() =>
        deletePersonCustomType(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PersonCustomType) => {
    const id = openSheet({
      children: () => (
        <PersonCustomTypeUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'contact.person-custom-type' }),
      description: t('editText', { ns: 'contact.person-custom-type' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('person_custom_type', { ns: 'modules' })} />
      <DataPanel
        url="/person-custom-type"
        layout="table"
        id="person-custom-type"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('person_custom_type.slug', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'name',
            header: t('person_custom_type.name', { ns: 'fields' }),
            isLocale: true
          }
        ]}
        selected={selectedItems as PersonCustomType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'contact.person-custom-type' }),
            handler: (items: PersonCustomType[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'contact.person-custom-type' }),
            variant: 'destructive',
            handler: (items: PersonCustomType[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'contact.person-custom-type' }),
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
