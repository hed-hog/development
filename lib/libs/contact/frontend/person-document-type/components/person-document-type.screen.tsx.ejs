import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { usePersonDocumentTypeDelete } from '@/features/contact/person-document-type';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { PersonDocumentType } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PersonDocumentTypeCreatePanel from './components/person-document-type-create-panel';
import PersonDocumentTypeUpdatePanel from './components/person-document-type-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonDocumentType[]>([]);
  const { mutate: deletePersonDocumentType } = usePersonDocumentTypeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation([
    'contact.person-document-type',
    'modules',
    'actions',
    'fields'
  ]);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'contact.person-document-type' }),
      description: t('createText', { ns: 'contact.person-document-type' }),
      children: () => (
        <PersonDocumentTypeCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: PersonDocumentType[]) => {
    return confirm({
      title: `${t('delete', { ns: 'contact.person-document-type' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'contact.person-document-type' })
    })
      .then(() =>
        deletePersonDocumentType(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PersonDocumentType) => {
    const id = openSheet({
      children: () => (
        <PersonDocumentTypeUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'contact.person-document-type' }),
      description: t('editText', { ns: 'contact.person-document-type' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('person_document_type', { ns: 'modules' })} />
      <DataPanel
        url="/person-document-type"
        layout="table"
        id="person-document-type"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64, isLocale: false },

          {
            key: 'slug',
            header: t('person_document_type.slug', { ns: 'fields' }),
            isLocale: false
          },

          {
            key: 'name',
            header: t('person_document_type.name', { ns: 'fields' }),
            isLocale: true
          }
        ]}
        selected={selectedItems as PersonDocumentType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'contact.person-document-type' }),
            handler: (items: PersonDocumentType[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'contact.person-document-type' }),
            variant: 'destructive',
            handler: (items: PersonDocumentType[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'contact.person-document-type' }),
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
