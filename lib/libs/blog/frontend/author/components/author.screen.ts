import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { useAuthorDelete } from "@/features/blog/author";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { Author } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AuthorCreatePanel from "./components/author-create-panel";
import AuthorUpdatePanel from "./components/author-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Author[]>([]);
  const { mutate: deleteAuthor } = useAuthorDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["author", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "author" }),
      children: () => <AuthorCreatePanel onCreated={() => closeSheet(id)} />,
    });

    return id;
  };

  const openDelete = (items: Author[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "author" }),
    })
      .then(() =>
        deleteAuthor(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Author) => {
    const id = openSheet({
      children: () => (
        <AuthorUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "author" }),
      description: t("editText", { ns: "author" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("author", { ns: "modules" })} />
      <DataPanel
        url="/author"
        layout="table"
        id="author"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "author" }) },
        ]}
        selected={selectedItems as Author[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "author" }),
            handler: (items: Author[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "author" }),
            variant: "destructive",
            handler: (items: Author[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "author" }),
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
