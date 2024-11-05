import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { useCategoryDelete } from "@/features/blog/category";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { Category } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CategoryCreatePanel from "./components/category-create-panel";
import CategoryUpdatePanel from "./components/category-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Category[]>([]);
  const { mutate: deleteCategory } = useCategoryDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["category", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "category" }),
      children: () => <CategoryCreatePanel onCreated={() => closeSheet(id)} />,
    });

    return id;
  };

  const openDelete = (items: Category[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "category" }),
    })
      .then(() =>
        deleteCategory(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Category) => {
    const id = openSheet({
      children: () => (
        <CategoryUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "category" }),
      description: t("editText", { ns: "category" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("category", { ns: "modules" })} />
      <DataPanel
        url="/category"
        layout="table"
        id="category"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "category" }) },
        ]}
        selected={selectedItems as Category[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "category" }),
            handler: (items: Category[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "category" }),
            variant: "destructive",
            handler: (items: Category[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "category" }),
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
