import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { usePersonGet, usePersonUpdate } from "@/features/contact/person";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Person } from "@/types/models";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { EnumFieldType } from "@/enums/EnumFieldType";

import DataPanel from "@/components/panels/data-panel";

import { useApp } from "@/hooks/use-app";
import PersonValueCreatePanel from "@/pages/contact/person-value/components/person-value-create-panel";
import PersonValueUpdatePanel from "@/pages/contact/person-value/components/person-value-update-panel";
import { PersonValue } from "@/types/models/PersonValue.ts";
import PersonAddressCreatePanel from "@/pages/contact/person-address/components/person-address-create-panel";
import PersonAddressUpdatePanel from "@/pages/contact/person-address/components/person-address-update-panel";
import { PersonAddress } from "@/types/models/PersonAddress.ts";
import PersonContactCreatePanel from "@/pages/contact/person-contact/components/person-contact-create-panel";
import PersonContactUpdatePanel from "@/pages/contact/person-contact/components/person-contact-update-panel";
import { PersonContact } from "@/types/models/PersonContact.ts";
import PersonDocumentCreatePanel from "@/pages/contact/person-document/components/person-document-create-panel";
import PersonDocumentUpdatePanel from "@/pages/contact/person-document/components/person-document-update-panel";
import { PersonDocument } from "@/types/models/PersonDocument.ts";
import PersonCustomCreatePanel from "@/pages/contact/person-custom/components/person-custom-create-panel";
import PersonCustomUpdatePanel from "@/pages/contact/person-custom/components/person-custom-update-panel";
import { PersonCustom } from "@/types/models/PersonCustom.ts";

export type PersonUpdatePanelProps = {
  data: Person;
  onUpdated?: (data: Person) => void;
};

const PersonUpdatePanel = forwardRef(
  ({ data, onUpdated }: PersonUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = usePersonGet(data.id as number);
    const { mutate: personUpdate } = usePersonUpdate();
    const formRef = useRef<FormPanelRef>(null);

    const { openDialog, closeDialog } = useApp();
    const personValueRef = useRef<any>(null);
    const openCreatePersonValue = () => {
      const id = openDialog({
        title: t("create", { ns: "actions" }),
        description: t("createText", { ns: "person-value" }),
        children: () => (
          <PersonValueCreatePanel onCreated={() => closeDialog(id)} />
        ),
      });

      return id;
    };
    const openUpdatePersonValue = (item: PersonValue) => {
      const id = openDialog({
        children: () => (
          <PersonValueUpdatePanel
            data={item}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "person-value" }),
        description: t("editText", { ns: "person-value" }),
      });

      return id;
    };
    const openDeletePersonValue = (items: PersonValue[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "contact.person-value" }),
      })
        .then(() =>
          deletePersonValue(
            items.map((item) => item.id).filter((id) => id !== undefined),
          ),
        )
        .catch(() => setSelectedItems(items));
    };
    const personAddressRef = useRef<any>(null);
    const openCreatePersonAddress = () => {
      const id = openDialog({
        title: t("create", { ns: "actions" }),
        description: t("createText", { ns: "person-address" }),
        children: () => (
          <PersonAddressCreatePanel onCreated={() => closeDialog(id)} />
        ),
      });

      return id;
    };
    const openUpdatePersonAddress = (item: PersonAddress) => {
      const id = openDialog({
        children: () => (
          <PersonAddressUpdatePanel
            data={item}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "person-address" }),
        description: t("editText", { ns: "person-address" }),
      });

      return id;
    };
    const openDeletePersonAddress = (items: PersonAddress[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "contact.person-address" }),
      })
        .then(() =>
          deletePersonAddress(
            items.map((item) => item.id).filter((id) => id !== undefined),
          ),
        )
        .catch(() => setSelectedItems(items));
    };
    const personContactRef = useRef<any>(null);
    const openCreatePersonContact = () => {
      const id = openDialog({
        title: t("create", { ns: "actions" }),
        description: t("createText", { ns: "person-contact" }),
        children: () => (
          <PersonContactCreatePanel onCreated={() => closeDialog(id)} />
        ),
      });

      return id;
    };
    const openUpdatePersonContact = (item: PersonContact) => {
      const id = openDialog({
        children: () => (
          <PersonContactUpdatePanel
            data={item}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "person-contact" }),
        description: t("editText", { ns: "person-contact" }),
      });

      return id;
    };
    const openDeletePersonContact = (items: PersonContact[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "contact.person-contact" }),
      })
        .then(() =>
          deletePersonContact(
            items.map((item) => item.id).filter((id) => id !== undefined),
          ),
        )
        .catch(() => setSelectedItems(items));
    };
    const personDocumentRef = useRef<any>(null);
    const openCreatePersonDocument = () => {
      const id = openDialog({
        title: t("create", { ns: "actions" }),
        description: t("createText", { ns: "person-document" }),
        children: () => (
          <PersonDocumentCreatePanel onCreated={() => closeDialog(id)} />
        ),
      });

      return id;
    };
    const openUpdatePersonDocument = (item: PersonDocument) => {
      const id = openDialog({
        children: () => (
          <PersonDocumentUpdatePanel
            data={item}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "person-document" }),
        description: t("editText", { ns: "person-document" }),
      });

      return id;
    };
    const openDeletePersonDocument = (items: PersonDocument[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "contact.person-document" }),
      })
        .then(() =>
          deletePersonDocument(
            items.map((item) => item.id).filter((id) => id !== undefined),
          ),
        )
        .catch(() => setSelectedItems(items));
    };
    const personCustomRef = useRef<any>(null);
    const openCreatePersonCustom = () => {
      const id = openDialog({
        title: t("create", { ns: "actions" }),
        description: t("createText", { ns: "person-custom" }),
        children: () => (
          <PersonCustomCreatePanel onCreated={() => closeDialog(id)} />
        ),
      });

      return id;
    };
    const openUpdatePersonCustom = (item: PersonCustom) => {
      const id = openDialog({
        children: () => (
          <PersonCustomUpdatePanel
            data={item}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "person-custom" }),
        description: t("editText", { ns: "person-custom" }),
      });

      return id;
    };
    const openDeletePersonCustom = (items: PersonCustom[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "contact.person-custom" }),
      })
        .then(() =>
          deletePersonCustom(
            items.map((item) => item.id).filter((id) => id !== undefined),
          ),
        )
        .catch(() => setSelectedItems(items));
    };

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item);
      }
    }, [item]);

    useImperativeHandle(ref, () => ({}));

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t("details", { ns: "actions" }),
            children: (
              <Overlay loading={isLoading}>
                <FormPanel
                  ref={formRef}
                  fields={[
                    {
                      name: "name",
                      label: { text: t("person.name", { ns: "fields" }) },
                      type: EnumFieldType.TEXT,
                      required: true,
                    },

                    {
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
                      type: EnumFieldType.DATEPICKER,
                      required: true,
                    },
                  ]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    personUpdate({ id: data.id, data });
                    if (typeof onUpdated === "function") {
                      onUpdated(data);
                    }
                  }}
                />
              </Overlay>
            ),
          },
          {
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
                    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      value: {item.value}
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
            children: (
              <DataPanel
                ref={personAddressRef}
                selectable
                multiple
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-address`}
                render={(item: PersonAddress) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      street: {item.street}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
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
            title: t("person_contact", { ns: "modules" }),
            children: (
              <DataPanel
                ref={personContactRef}
                selectable
                multiple
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-contact`}
                render={(item: PersonContact) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      value: {item.value}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
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
            title: t("person_document", { ns: "modules" }),
            children: (
              <DataPanel
                ref={personDocumentRef}
                selectable
                multiple
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-document`}
                render={(item: PersonDocument) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      value: {item.value}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
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
            title: t("person_custom", { ns: "modules" }),
            children: (
              <DataPanel
                ref={personCustomRef}
                selectable
                multiple
                layout="list"
                id={`person-${item?.id}`}
                url={`/person/${item?.id}/person-custom`}
                render={(item: PersonCustom) => (
                  <div className="flex flex-row gap-2">
                    <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                      id: {item.id}
                    </span>
                  </div>
                )}
                menuActions={[
                  {
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
        ]}
      />
    );
  },
);

PersonUpdatePanel.displayName = "PersonUpdatePanel";

export default PersonUpdatePanel;
