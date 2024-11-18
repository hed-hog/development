import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { usePersonContactTypeDelete } from "@/features/contact/person-contact-type";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { PersonContactType } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PersonContactTypeCreatePanel from "./components/person-contact-type-create-panel";
import PersonContactTypeUpdatePanel from "./components/person-contact-type-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonContactType[]>([]);
  const { mutate: deletePersonContactType } = usePersonContactTypeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["person-contact-type", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "person-contact-type" }),
      children: () => (
        <PersonContactTypeCreatePanel onCreated={() => closeSheet(id)} />
      ),
    });

    return id;
  };

  const openDelete = (items: PersonContactType[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "person-contact-type" }),
    })
      .then(() =>
        deletePersonContactType(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PersonContactType) => {
    const id = openSheet({
      children: () => (
        <PersonContactTypeUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t("edit", { ns: "person-contact-type" }),
      description: t("editText", { ns: "person-contact-type" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("personContactType", { ns: "modules" })} />
      <DataPanel
        url="/person-contact-type"
        layout="table"
        id="person-contact-type"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "person-contact-type" }) },
        ]}
        selected={selectedItems as PersonContactType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "person-contact-type" }),
            handler: (items: PersonContactType[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "person-contact-type" }),
            variant: "destructive",
            handler: (items: PersonContactType[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "person-contact-type" }),
            variant: "default",
            handler: () => {
              openCreate();
            },
            show: "none",
          },
        ]}
      />
    </>
  );
}
