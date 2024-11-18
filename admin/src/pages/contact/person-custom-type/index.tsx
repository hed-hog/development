import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { usePersonCustomTypeDelete } from "@/features/contact/person-custom-type";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { PersonCustomType } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PersonCustomTypeCreatePanel from "./components/person-custom-type-create-panel";
import PersonCustomTypeUpdatePanel from "./components/person-custom-type-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonCustomType[]>([]);
  const { mutate: deletePersonCustomType } = usePersonCustomTypeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["person-custom-type", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "person-custom-type" }),
      children: () => (
        <PersonCustomTypeCreatePanel onCreated={() => closeSheet(id)} />
      ),
    });

    return id;
  };

  const openDelete = (items: PersonCustomType[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "person-custom-type" }),
    })
      .then(() =>
        deletePersonCustomType(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
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
      title: t("edit", { ns: "person-custom-type" }),
      description: t("editText", { ns: "person-custom-type" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("personCustomType", { ns: "modules" })} />
      <DataPanel
        url="/person-custom-type"
        layout="table"
        id="person-custom-type"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "person-custom-type" }) },
        ]}
        selected={selectedItems as PersonCustomType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "person-custom-type" }),
            handler: (items: PersonCustomType[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "person-custom-type" }),
            variant: "destructive",
            handler: (items: PersonCustomType[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "person-custom-type" }),
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
