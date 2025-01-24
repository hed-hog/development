<<<<<<< HEAD
import { Overlay } from '@/components/custom/overlay'
import FormPanel, { FormPanelRef } from '@/components/panels/form-panel'
import { TabPanel } from '@/components/panels/tab-panel'
import { EnumFieldType } from '@/enums/EnumFieldType'
import { usePersonGet, usePersonUpdate } from '@/features/contact/person'
import useEffectAfterFirstUpdate from '@/hooks/use-effect-after-first-update'
import { Person } from '@/types/models'
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import DataPanel from '@/components/panels/data-panel'

import { usePersonAddressDelete } from '@/features/contact/person-address'
import { usePersonContactDelete } from '@/features/contact/person-contact'
import { usePersonCustomDelete } from '@/features/contact/person-custom'
import { usePersonDocumentDelete } from '@/features/contact/person-document'
import { useApp } from '@/hooks/use-app'
import { isPlural } from '@/lib/utils'
import PersonAddressCreatePanel from '@/pages/contact/person-address/components/person-address-create-panel'
import PersonAddressUpdatePanel from '@/pages/contact/person-address/components/person-address-update-panel'
import PersonContactCreatePanel from '@/pages/contact/person-contact/components/person-contact-create-panel'
import PersonContactUpdatePanel from '@/pages/contact/person-contact/components/person-contact-update-panel'
import PersonCustomCreatePanel from '@/pages/contact/person-custom/components/person-custom-create-panel'
import PersonCustomUpdatePanel from '@/pages/contact/person-custom/components/person-custom-update-panel'
import PersonDocumentCreatePanel from '@/pages/contact/person-document/components/person-document-create-panel'
import PersonDocumentUpdatePanel from '@/pages/contact/person-document/components/person-document-update-panel'
import { PersonAddress } from '@/types/models/PersonAddress.ts'
import { PersonContact } from '@/types/models/PersonContact.ts'
import { PersonCustom } from '@/types/models/PersonCustom.ts'
import { PersonDocument } from '@/types/models/PersonDocument.ts'

export type PersonUpdatePanelProps = {
  data: Person
  onUpdated?: (data: Person) => void
}
=======
import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { usePersonGet, usePersonUpdate } from "@/features/contact/person";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Person } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

import DataPanel from "@/components/panels/data-panel";

import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { PersonValue } from "@/types/models/PersonValue.ts";
import { usePersonValueDelete } from "@/features/contact/person-value";
import PersonValueCreatePanel from "@/pages/contact/person-value/components/person-value-create-panel";
import PersonValueUpdatePanel from "@/pages/contact/person-value/components/person-value-update-panel";
import { PersonAddress } from "@/types/models/PersonAddress.ts";
import { usePersonAddressDelete } from "@/features/contact/person-address";
import PersonAddressCreatePanel from "@/pages/contact/person-address/components/person-address-create-panel";
import PersonAddressUpdatePanel from "@/pages/contact/person-address/components/person-address-update-panel";
import { PersonContact } from "@/types/models/PersonContact.ts";
import { usePersonContactDelete } from "@/features/contact/person-contact";
import PersonContactCreatePanel from "@/pages/contact/person-contact/components/person-contact-create-panel";
import PersonContactUpdatePanel from "@/pages/contact/person-contact/components/person-contact-update-panel";
import { PersonDocument } from "@/types/models/PersonDocument.ts";
import { usePersonDocumentDelete } from "@/features/contact/person-document";
import PersonDocumentCreatePanel from "@/pages/contact/person-document/components/person-document-create-panel";
import PersonDocumentUpdatePanel from "@/pages/contact/person-document/components/person-document-update-panel";
import { PersonCustom } from "@/types/models/PersonCustom.ts";
import { usePersonCustomDelete } from "@/features/contact/person-custom";
import PersonCustomCreatePanel from "@/pages/contact/person-custom/components/person-custom-create-panel";
import PersonCustomUpdatePanel from "@/pages/contact/person-custom/components/person-custom-update-panel";

export type PersonUpdatePanelProps = {
  data: Person;
  onUpdated?: (data: Person) => void;
};
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4

const PersonUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonUpdatePanelProps, ref) => {
    const { t } = useTranslation([
<<<<<<< HEAD
      'actions',
      'fields',
      'translations',

      'contact.person-value',

      'contact.person-address',

      'contact.person-contact',

      'contact.person-document',

      'contact.person-custom',
    ])
    const { data: item, isLoading } = usePersonGet(data.id as number)
    const { mutate: personUpdate } = usePersonUpdate()
    const formRef = useRef<FormPanelRef>(null)

    const { openDialog, confirm, closeDialog } = useApp()
    const [selectedItems, setSelectedItems] = useState<any[]>([])

    const personAddressRef = useRef<any>(null)
    const { mutate: personAddressDelete } = usePersonAddressDelete()
    const openCreatePersonAddress = () => {
      const id = openDialog({
        title: t('create', { ns: 'contact.person-address' }),
        description: t('createText', { ns: 'contact.person-address' }),
=======
      "actions",
      "fields",
      "translations",

      "contact.person-value",

      "contact.person-address",

      "contact.person-contact",

      "contact.person-document",

      "contact.person-custom",
    ]);
    const { data: item, isLoading } = usePersonGet(data.id as number);
    const { mutate: personUpdate } = usePersonUpdate();
    const formRef = useRef<FormPanelRef>(null);

    const { openDialog, confirm, closeDialog } = useApp();
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const personValueRef = useRef<any>(null);
    const { mutate: personValueDelete } = usePersonValueDelete();
    const openCreatePersonValue = () => {
      const id = openDialog({
        title: t("create", { ns: "contact.person-value" }),
        description: t("createText", { ns: "contact.person-value" }),
        children: () => (
          <PersonValueCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      });

      return id;
    };
    const openUpdatePersonValue = (itemPersonValue: PersonValue) => {
      const id = openDialog({
        children: () => (
          <PersonValueUpdatePanel
            id={Number(item?.id)}
            data={itemPersonValue}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "contact.person-value" }),
        description: t("editText", { ns: "contact.person-value" }),
      });

      return id;
    };
    const openDeletePersonValue = (items: PersonValue[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "contact.person-value" }),
      })
        .then(() =>
          personValueDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          }),
        )
        .catch(() => setSelectedItems(items));
    };
    const personAddressRef = useRef<any>(null);
    const { mutate: personAddressDelete } = usePersonAddressDelete();
    const openCreatePersonAddress = () => {
      const id = openDialog({
        title: t("create", { ns: "contact.person-address" }),
        description: t("createText", { ns: "contact.person-address" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
        children: () => (
          <PersonAddressCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
<<<<<<< HEAD
      })

      return id
    }
=======
      });

      return id;
    };
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
    const openUpdatePersonAddress = (itemPersonAddress: PersonAddress) => {
      const id = openDialog({
        children: () => (
          <PersonAddressUpdatePanel
            id={Number(item?.id)}
            data={itemPersonAddress}
            onUpdated={() => closeDialog(id)}
          />
        ),
<<<<<<< HEAD
        title: t('edit', { ns: 'contact.person-address' }),
        description: t('editText', { ns: 'contact.person-address' }),
      })

      return id
    }
    const openDeletePersonAddress = (items: PersonAddress[]) => {
      return confirm({
        title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
        description: t('deleteText', { ns: 'contact.person-address' }),
=======
        title: t("edit", { ns: "contact.person-address" }),
        description: t("editText", { ns: "contact.person-address" }),
      });

      return id;
    };
    const openDeletePersonAddress = (items: PersonAddress[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "contact.person-address" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
      })
        .then(() =>
          personAddressDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
<<<<<<< HEAD
          })
        )
        .catch(() => setSelectedItems(items))
    }
    const personContactRef = useRef<any>(null)
    const { mutate: personContactDelete } = usePersonContactDelete()
    const openCreatePersonContact = () => {
      const id = openDialog({
        title: t('create', { ns: 'contact.person-contact' }),
        description: t('createText', { ns: 'contact.person-contact' }),
=======
          }),
        )
        .catch(() => setSelectedItems(items));
    };
    const personContactRef = useRef<any>(null);
    const { mutate: personContactDelete } = usePersonContactDelete();
    const openCreatePersonContact = () => {
      const id = openDialog({
        title: t("create", { ns: "contact.person-contact" }),
        description: t("createText", { ns: "contact.person-contact" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
        children: () => (
          <PersonContactCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
<<<<<<< HEAD
      })

      return id
    }
=======
      });

      return id;
    };
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
    const openUpdatePersonContact = (itemPersonContact: PersonContact) => {
      const id = openDialog({
        children: () => (
          <PersonContactUpdatePanel
            id={Number(item?.id)}
            data={itemPersonContact}
            onUpdated={() => closeDialog(id)}
          />
        ),
<<<<<<< HEAD
        title: t('edit', { ns: 'contact.person-contact' }),
        description: t('editText', { ns: 'contact.person-contact' }),
      })

      return id
    }
    const openDeletePersonContact = (items: PersonContact[]) => {
      return confirm({
        title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
        description: t('deleteText', { ns: 'contact.person-contact' }),
=======
        title: t("edit", { ns: "contact.person-contact" }),
        description: t("editText", { ns: "contact.person-contact" }),
      });

      return id;
    };
    const openDeletePersonContact = (items: PersonContact[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "contact.person-contact" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
      })
        .then(() =>
          personContactDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
<<<<<<< HEAD
          })
        )
        .catch(() => setSelectedItems(items))
    }
    const personDocumentRef = useRef<any>(null)
    const { mutate: personDocumentDelete } = usePersonDocumentDelete()
    const openCreatePersonDocument = () => {
      const id = openDialog({
        title: t('create', { ns: 'contact.person-document' }),
        description: t('createText', { ns: 'contact.person-document' }),
=======
          }),
        )
        .catch(() => setSelectedItems(items));
    };
    const personDocumentRef = useRef<any>(null);
    const { mutate: personDocumentDelete } = usePersonDocumentDelete();
    const openCreatePersonDocument = () => {
      const id = openDialog({
        title: t("create", { ns: "contact.person-document" }),
        description: t("createText", { ns: "contact.person-document" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
        children: () => (
          <PersonDocumentCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
<<<<<<< HEAD
      })

      return id
    }
=======
      });

      return id;
    };
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
    const openUpdatePersonDocument = (itemPersonDocument: PersonDocument) => {
      const id = openDialog({
        children: () => (
          <PersonDocumentUpdatePanel
            id={Number(item?.id)}
            data={itemPersonDocument}
            onUpdated={() => closeDialog(id)}
          />
        ),
<<<<<<< HEAD
        title: t('edit', { ns: 'contact.person-document' }),
        description: t('editText', { ns: 'contact.person-document' }),
      })

      return id
    }
    const openDeletePersonDocument = (items: PersonDocument[]) => {
      return confirm({
        title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
        description: t('deleteText', { ns: 'contact.person-document' }),
=======
        title: t("edit", { ns: "contact.person-document" }),
        description: t("editText", { ns: "contact.person-document" }),
      });

      return id;
    };
    const openDeletePersonDocument = (items: PersonDocument[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "contact.person-document" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
      })
        .then(() =>
          personDocumentDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
<<<<<<< HEAD
          })
        )
        .catch(() => setSelectedItems(items))
    }
    const personCustomRef = useRef<any>(null)
    const { mutate: personCustomDelete } = usePersonCustomDelete()
    const openCreatePersonCustom = () => {
      const id = openDialog({
        title: t('create', { ns: 'contact.person-custom' }),
        description: t('createText', { ns: 'contact.person-custom' }),
=======
          }),
        )
        .catch(() => setSelectedItems(items));
    };
    const personCustomRef = useRef<any>(null);
    const { mutate: personCustomDelete } = usePersonCustomDelete();
    const openCreatePersonCustom = () => {
      const id = openDialog({
        title: t("create", { ns: "contact.person-custom" }),
        description: t("createText", { ns: "contact.person-custom" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
        children: () => (
          <PersonCustomCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
<<<<<<< HEAD
      })

      return id
    }
=======
      });

      return id;
    };
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
    const openUpdatePersonCustom = (itemPersonCustom: PersonCustom) => {
      const id = openDialog({
        children: () => (
          <PersonCustomUpdatePanel
            id={Number(item?.id)}
            data={itemPersonCustom}
            onUpdated={() => closeDialog(id)}
          />
        ),
<<<<<<< HEAD
        title: t('edit', { ns: 'contact.person-custom' }),
        description: t('editText', { ns: 'contact.person-custom' }),
      })

      return id
    }
    const openDeletePersonCustom = (items: PersonCustom[]) => {
      return confirm({
        title: `${t('delete', { ns: 'actions' })} ${items.length} ${isPlural(items.length) ? t('items', { ns: 'actions' }) : t('item', { ns: 'actions' })}`,
        description: t('deleteText', { ns: 'contact.person-custom' }),
=======
        title: t("edit", { ns: "contact.person-custom" }),
        description: t("editText", { ns: "contact.person-custom" }),
      });

      return id;
    };
    const openDeletePersonCustom = (items: PersonCustom[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "contact.person-custom" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
      })
        .then(() =>
          personCustomDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
<<<<<<< HEAD
          })
        )
        .catch(() => setSelectedItems(items))
    }

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item)
      }
    }, [item])

    useImperativeHandle(ref, () => ({}))
=======
          }),
        )
        .catch(() => setSelectedItems(items));
    };

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item);
      }
    }, [item]);

    useImperativeHandle(ref, () => ({}));
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
<<<<<<< HEAD
            title: t('details', { ns: 'actions' }),
=======
            title: t("details", { ns: "actions" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
            children: (
              <Overlay loading={isLoading}>
                <FormPanel
                  ref={formRef}
                  fields={[
                    {
<<<<<<< HEAD
                      name: 'name',
                      label: { text: t('person.name', { ns: 'fields' }) },
=======
                      name: "name",
                      label: { text: t("person.name", { ns: "fields" }) },
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
<<<<<<< HEAD
                      name: 'photo_id',
                      label: { text: t('person.photo_id', { ns: 'fields' }) },
                      type: EnumFieldType.FILE,
                      required: true,
                      url: '/file',
                      displayName: 'photo',
                      valueName: 'id',
                    },

                    {
                      name: 'type_id',
                      label: { text: t('person.type_id', { ns: 'fields' }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: '/person-type',
                      displayName: 'type',
                      valueName: 'id',
                    },

                    {
                      name: 'birth_at',
                      label: { text: t('person.birth_at', { ns: 'fields' }) },
=======
                      name: "photo_id",
                      label: { text: t("person.photo_id", { ns: "fields" }) },
                      type: EnumFieldType.FILE,
                      required: true,
                      url: "/file",
                      displayName: "photo",
                      valueName: "id",
                    },

                    {
                      name: "type_id",
                      label: { text: t("person.type_id", { ns: "fields" }) },
                      type: EnumFieldType.COMBOBOX,
                      required: true,
                      url: "/person-type",
                      displayName: "type",
                      valueName: "id",
                    },

                    {
                      name: "birth_at",
                      label: { text: t("person.birth_at", { ns: "fields" }) },
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                      type: EnumFieldType.DATEPICKER,
                      required: true,
                    },
                  ]}
<<<<<<< HEAD
                  button={{ text: t('save', { ns: 'actions' }) }}
=======
                  button={{ text: t("save", { ns: "actions" }) }}
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                  onSubmit={(data) => {
                    personUpdate({
                      id: data.id,
                      data,
<<<<<<< HEAD
                    })
                    if (typeof onUpdated === 'function') {
                      onUpdated(data)
=======
                    });
                    if (typeof onUpdated === "function") {
                      onUpdated(data);
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                    }
                  }}
                />
              </Overlay>
            ),
          },
          {
<<<<<<< HEAD
            title: t('person_address', { ns: 'modules' }),
=======
            title: t("person_value", { ns: "modules" }),
            children: (
              <DataPanel
                ref={personValueRef}
                selectable
                multiple
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-value`}
                render={(item: PersonValue) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative px-[0.3rem] py-[0.2rem] text-sm">
                      {item.value}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
                    icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
                    label: t("edit", { ns: "actions" }),
                    tooltip: t("editTooltip", { ns: "contact.person" }),
                    handler: (items: PersonValue[]) => {
                      if (items.length === 1) openUpdatePersonValue(items[0]);
                    },
                    show: "once",
                  },
                  {
                    icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
                    label: t("delete", { ns: "actions" }),
                    tooltip: t("deleteTooltip", { ns: "contact.person" }),
                    variant: "destructive",
                    handler: (items: PersonValue[]) => {
                      openDeletePersonValue(items);
                    },
                    show: "some",
                  },
                  {
                    icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
                    label: t("create", { ns: "actions" }),
                    tooltip: t("createTooltip", { ns: "contact.person" }),
                    variant: "default",
                    handler: () => {
                      openCreatePersonValue();
                    },
                    show: "none",
                  },
                ]}
              />
            ),
            buttons: [
              {
                text: t("apply", { ns: "actions" }),
                variant: "default",
                onClick: () => {},
              },
            ],
          },
          {
            title: t("person_address", { ns: "modules" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
            children: (
              <DataPanel
                ref={personAddressRef}
                selectable
                multiple
<<<<<<< HEAD
                layout='list'
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-address`}
                render={(item: PersonAddress) => (
                  <div className='flex flex-row gap-2'>
                    <span className='relative px-[0.3rem] py-[0.2rem] text-sm'>
=======
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-address`}
                render={(item: PersonAddress) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative px-[0.3rem] py-[0.2rem] text-sm">
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                      {item.street}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
<<<<<<< HEAD
                    icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
                    label: t('edit', { ns: 'actions' }),
                    tooltip: t('editTooltip', { ns: 'contact.person' }),
                    handler: (items: PersonAddress[]) => {
                      if (items.length === 1) openUpdatePersonAddress(items[0])
                    },
                    show: 'once',
                  },
                  {
                    icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
                    label: t('delete', { ns: 'actions' }),
                    tooltip: t('deleteTooltip', { ns: 'contact.person' }),
                    variant: 'destructive',
                    handler: (items: PersonAddress[]) => {
                      openDeletePersonAddress(items)
                    },
                    show: 'some',
                  },
                  {
                    icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
                    label: t('create', { ns: 'actions' }),
                    tooltip: t('createTooltip', { ns: 'contact.person' }),
                    variant: 'default',
                    handler: () => {
                      openCreatePersonAddress()
                    },
                    show: 'none',
=======
                    icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
                    label: t("edit", { ns: "actions" }),
                    tooltip: t("editTooltip", { ns: "contact.person" }),
                    handler: (items: PersonAddress[]) => {
                      if (items.length === 1) openUpdatePersonAddress(items[0]);
                    },
                    show: "once",
                  },
                  {
                    icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
                    label: t("delete", { ns: "actions" }),
                    tooltip: t("deleteTooltip", { ns: "contact.person" }),
                    variant: "destructive",
                    handler: (items: PersonAddress[]) => {
                      openDeletePersonAddress(items);
                    },
                    show: "some",
                  },
                  {
                    icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
                    label: t("create", { ns: "actions" }),
                    tooltip: t("createTooltip", { ns: "contact.person" }),
                    variant: "default",
                    handler: () => {
                      openCreatePersonAddress();
                    },
                    show: "none",
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                  },
                ]}
              />
            ),
            buttons: [
              {
<<<<<<< HEAD
                text: t('apply', { ns: 'actions' }),
                variant: 'default',
=======
                text: t("apply", { ns: "actions" }),
                variant: "default",
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                onClick: () => {},
              },
            ],
          },
          {
<<<<<<< HEAD
            title: t('person_contact', { ns: 'modules' }),
=======
            title: t("person_contact", { ns: "modules" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
            children: (
              <DataPanel
                ref={personContactRef}
                selectable
                multiple
<<<<<<< HEAD
                layout='list'
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-contact`}
                render={(item: PersonContact) => (
                  <div className='flex flex-row gap-2'>
                    <span className='relative px-[0.3rem] py-[0.2rem] text-sm'>
=======
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-contact`}
                render={(item: PersonContact) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative px-[0.3rem] py-[0.2rem] text-sm">
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                      {item.value}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
<<<<<<< HEAD
                    icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
                    label: t('edit', { ns: 'actions' }),
                    tooltip: t('editTooltip', { ns: 'contact.person' }),
                    handler: (items: PersonContact[]) => {
                      if (items.length === 1) openUpdatePersonContact(items[0])
                    },
                    show: 'once',
                  },
                  {
                    icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
                    label: t('delete', { ns: 'actions' }),
                    tooltip: t('deleteTooltip', { ns: 'contact.person' }),
                    variant: 'destructive',
                    handler: (items: PersonContact[]) => {
                      openDeletePersonContact(items)
                    },
                    show: 'some',
                  },
                  {
                    icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
                    label: t('create', { ns: 'actions' }),
                    tooltip: t('createTooltip', { ns: 'contact.person' }),
                    variant: 'default',
                    handler: () => {
                      openCreatePersonContact()
                    },
                    show: 'none',
=======
                    icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
                    label: t("edit", { ns: "actions" }),
                    tooltip: t("editTooltip", { ns: "contact.person" }),
                    handler: (items: PersonContact[]) => {
                      if (items.length === 1) openUpdatePersonContact(items[0]);
                    },
                    show: "once",
                  },
                  {
                    icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
                    label: t("delete", { ns: "actions" }),
                    tooltip: t("deleteTooltip", { ns: "contact.person" }),
                    variant: "destructive",
                    handler: (items: PersonContact[]) => {
                      openDeletePersonContact(items);
                    },
                    show: "some",
                  },
                  {
                    icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
                    label: t("create", { ns: "actions" }),
                    tooltip: t("createTooltip", { ns: "contact.person" }),
                    variant: "default",
                    handler: () => {
                      openCreatePersonContact();
                    },
                    show: "none",
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                  },
                ]}
              />
            ),
            buttons: [
              {
<<<<<<< HEAD
                text: t('apply', { ns: 'actions' }),
                variant: 'default',
=======
                text: t("apply", { ns: "actions" }),
                variant: "default",
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                onClick: () => {},
              },
            ],
          },
          {
<<<<<<< HEAD
            title: t('person_document', { ns: 'modules' }),
=======
            title: t("person_document", { ns: "modules" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
            children: (
              <DataPanel
                ref={personDocumentRef}
                selectable
                multiple
<<<<<<< HEAD
                layout='list'
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-document`}
                render={(item: PersonDocument) => (
                  <div className='flex flex-row gap-2'>
                    <span className='relative px-[0.3rem] py-[0.2rem] text-sm'>
=======
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-document`}
                render={(item: PersonDocument) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative px-[0.3rem] py-[0.2rem] text-sm">
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                      {item.value}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
<<<<<<< HEAD
                    icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
                    label: t('edit', { ns: 'actions' }),
                    tooltip: t('editTooltip', { ns: 'contact.person' }),
                    handler: (items: PersonDocument[]) => {
                      if (items.length === 1) openUpdatePersonDocument(items[0])
                    },
                    show: 'once',
                  },
                  {
                    icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
                    label: t('delete', { ns: 'actions' }),
                    tooltip: t('deleteTooltip', { ns: 'contact.person' }),
                    variant: 'destructive',
                    handler: (items: PersonDocument[]) => {
                      openDeletePersonDocument(items)
                    },
                    show: 'some',
                  },
                  {
                    icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
                    label: t('create', { ns: 'actions' }),
                    tooltip: t('createTooltip', { ns: 'contact.person' }),
                    variant: 'default',
                    handler: () => {
                      openCreatePersonDocument()
                    },
                    show: 'none',
=======
                    icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
                    label: t("edit", { ns: "actions" }),
                    tooltip: t("editTooltip", { ns: "contact.person" }),
                    handler: (items: PersonDocument[]) => {
                      if (items.length === 1)
                        openUpdatePersonDocument(items[0]);
                    },
                    show: "once",
                  },
                  {
                    icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
                    label: t("delete", { ns: "actions" }),
                    tooltip: t("deleteTooltip", { ns: "contact.person" }),
                    variant: "destructive",
                    handler: (items: PersonDocument[]) => {
                      openDeletePersonDocument(items);
                    },
                    show: "some",
                  },
                  {
                    icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
                    label: t("create", { ns: "actions" }),
                    tooltip: t("createTooltip", { ns: "contact.person" }),
                    variant: "default",
                    handler: () => {
                      openCreatePersonDocument();
                    },
                    show: "none",
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                  },
                ]}
              />
            ),
            buttons: [
              {
<<<<<<< HEAD
                text: t('apply', { ns: 'actions' }),
                variant: 'default',
=======
                text: t("apply", { ns: "actions" }),
                variant: "default",
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                onClick: () => {},
              },
            ],
          },
          {
<<<<<<< HEAD
            title: t('person_custom', { ns: 'modules' }),
=======
            title: t("person_custom", { ns: "modules" }),
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
            children: (
              <DataPanel
                ref={personCustomRef}
                selectable
                multiple
<<<<<<< HEAD
                layout='list'
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-custom`}
                render={(item: PersonCustom) => (
                  <div className='flex flex-row gap-2'>
                    <span className='relative px-[0.3rem] py-[0.2rem] text-sm'>
=======
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-custom`}
                render={(item: PersonCustom) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative px-[0.3rem] py-[0.2rem] text-sm">
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                      {item.id}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
<<<<<<< HEAD
                    icon: <IconEdit className='mr-1 w-8 cursor-pointer' />,
                    label: t('edit', { ns: 'actions' }),
                    tooltip: t('editTooltip', { ns: 'contact.person' }),
                    handler: (items: PersonCustom[]) => {
                      if (items.length === 1) openUpdatePersonCustom(items[0])
                    },
                    show: 'once',
                  },
                  {
                    icon: <IconTrash className='mr-1 w-8 cursor-pointer' />,
                    label: t('delete', { ns: 'actions' }),
                    tooltip: t('deleteTooltip', { ns: 'contact.person' }),
                    variant: 'destructive',
                    handler: (items: PersonCustom[]) => {
                      openDeletePersonCustom(items)
                    },
                    show: 'some',
                  },
                  {
                    icon: <IconPlus className='mr-1 w-8 cursor-pointer' />,
                    label: t('create', { ns: 'actions' }),
                    tooltip: t('createTooltip', { ns: 'contact.person' }),
                    variant: 'default',
                    handler: () => {
                      openCreatePersonCustom()
                    },
                    show: 'none',
=======
                    icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
                    label: t("edit", { ns: "actions" }),
                    tooltip: t("editTooltip", { ns: "contact.person" }),
                    handler: (items: PersonCustom[]) => {
                      if (items.length === 1) openUpdatePersonCustom(items[0]);
                    },
                    show: "once",
                  },
                  {
                    icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
                    label: t("delete", { ns: "actions" }),
                    tooltip: t("deleteTooltip", { ns: "contact.person" }),
                    variant: "destructive",
                    handler: (items: PersonCustom[]) => {
                      openDeletePersonCustom(items);
                    },
                    show: "some",
                  },
                  {
                    icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
                    label: t("create", { ns: "actions" }),
                    tooltip: t("createTooltip", { ns: "contact.person" }),
                    variant: "default",
                    handler: () => {
                      openCreatePersonCustom();
                    },
                    show: "none",
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                  },
                ]}
              />
            ),
            buttons: [
              {
<<<<<<< HEAD
                text: t('apply', { ns: 'actions' }),
                variant: 'default',
=======
                text: t("apply", { ns: "actions" }),
                variant: "default",
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
                onClick: () => {},
              },
            ],
          },
        ]}
      />
<<<<<<< HEAD
    )
  }
)

PersonUpdatePanel.displayName = 'PersonUpdatePanel'

export default PersonUpdatePanel
=======
    );
  },
);

PersonUpdatePanel.displayName = "PersonUpdatePanel";

export default PersonUpdatePanel;
>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4
