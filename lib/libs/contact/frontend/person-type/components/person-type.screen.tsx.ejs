import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { usePersonTypeDelete } from "@/features/contact/person-type";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { PersonType } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PersonTypeCreatePanel from "./components/person-type-create-panel";
import PersonTypeUpdatePanel from "./components/person-type-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonType[]>([]);
  const { mutate: deletePersonType } = usePersonTypeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["person-type", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "person-type" }),
      children: () => (
        <PersonTypeCreatePanel onCreated={() => closeSheet(id)} />
      ),
    });

    return id;
  };

  const openDelete = (items: PersonType[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "person-type" }),
    })
      .then(() =>
        deletePersonType(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PersonType) => {
    const id = openSheet({
      children: () => (
        <PersonTypeUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "person-type" }),
      description: t("editText", { ns: "person-type" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("personType", { ns: "modules" })} />
      <DataPanel
        url="/person-type"
        layout="table"
        id="person-type"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "person-type" }) },
        ]}
        selected={selectedItems as PersonType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "person-type" }),
            handler: (items: PersonType[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "person-type" }),
            variant: "destructive",
            handler: (items: PersonType[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "person-type" }),
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
