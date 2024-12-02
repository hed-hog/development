import { PageTitle } from '@/components/custom/page-title';
import DataPanel from '@/components/panels/data-panel';
import { usePersonAddressTypeDelete } from '@/features/contact/person-address-type';
import { useApp } from '@/hooks/use-app';
import { isPlural } from '@/lib/utils';
import { PersonAddressType } from '@/types/models';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PersonAddressTypeCreatePanel from './components/person-address-type-create-panel';
import PersonAddressTypeUpdatePanel from './components/person-address-type-update-panel';

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonAddressType[]>([]);
  const { mutate: deletePersonAddressType } = usePersonAddressTypeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(['person-address-type', 'modules', 'actions']);

  const openCreate = () => {
    const id = openSheet({
      title: t('create', { ns: 'actions' }),
      description: t('createText', { ns: 'person-address-type' }),
      children: () => (
        <PersonAddressTypeCreatePanel onCreated={() => closeSheet(id)} />
      )
    });

    return id;
  };

  const openDelete = (items: PersonAddressType[]) => {
    return confirm({
      title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
      description: t('deleteText', { ns: 'person-address-type' })
    })
      .then(() =>
        deletePersonAddressType(
          items.map((item) => item.id).filter((id) => id !== undefined)
        )
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PersonAddressType) => {
    const id = openSheet({
      children: () => (
        <PersonAddressTypeUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t('edit', { ns: 'person-address-type' }),
      description: t('editText', { ns: 'person-address-type' })
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t('person_address_type', { ns: 'modules' })} />
      <DataPanel
        url="/person-address-type"
        layout="table"
        id="person-address-type"
        selectable
        columns={[
          { key: 'id', header: 'ID', width: 64 },
          { key: 'name', header: t('name', { ns: 'person-address-type' }) }
        ]}
        selected={selectedItems as PersonAddressType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t('edit', { ns: 'actions' }),
            tooltip: t('editTooltip', { ns: 'person-address-type' }),
            handler: (items: PersonAddressType[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: 'once'
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t('delete', { ns: 'actions' }),
            tooltip: t('deleteTooltip', { ns: 'person-address-type' }),
            variant: 'destructive',
            handler: (items: PersonAddressType[]) => {
              openDelete(items);
            },
            show: 'some'
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t('create', { ns: 'actions' }),
            tooltip: t('createTooltip', { ns: 'person-address-type' }),
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
