import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { usePersonTestDelete } from "@/features/contact/person-test";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { PersonTest } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PersonTestCreatePanel from "./components/person-test-create-panel";
import PersonTestUpdatePanel from "./components/person-test-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonTest[]>([]);
  const { mutate: deletePersonTest } = usePersonTestDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["person-test", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "person-test" }),
      children: () => (
        <PersonTestCreatePanel onCreated={() => closeSheet(id)} />
      ),
    });

    return id;
  };

  const openDelete = (items: PersonTest[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "person-test" }),
    })
      .then(() =>
        deletePersonTest(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PersonTest) => {
    const id = openSheet({
      children: () => (
        <PersonTestUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "person-test" }),
      description: t("editText", { ns: "person-test" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("personTest", { ns: "modules" })} />
      <DataPanel
        url="/person-test"
        layout="table"
        id="person-test"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "person-test" }) },
        ]}
        selected={selectedItems as PersonTest[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "person-test" }),
            handler: (items: PersonTest[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "person-test" }),
            variant: "destructive",
            handler: (items: PersonTest[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "person-test" }),
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
