import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { usePersonDelete } from "@/features/contact/person";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { Person } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PersonCreatePanel from "./components/person-create-panel";
import PersonUpdatePanel from "./components/person-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Person[]>([]);
  const { mutate: deletePerson } = usePersonDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["person", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "person" }),
      children: () => <PersonCreatePanel onCreated={() => closeSheet(id)} />,
    });

    return id;
  };

  const openDelete = (items: Person[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "person" }),
    })
      .then(() =>
        deletePerson(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Person) => {
    const id = openSheet({
      children: () => (
        <PersonUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "person" }),
      description: t("editText", { ns: "person" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("person", { ns: "modules" })} />
      <DataPanel
        url="/person"
        layout="table"
        id="person"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "person" }) },
        ]}
        selected={selectedItems as Person[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "person" }),
            handler: (items: Person[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "person" }),
            variant: "destructive",
            handler: (items: Person[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "person" }),
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
