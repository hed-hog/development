import DataPanel from "@/components/panels/data-panel";
import { PageTitle } from "@/components/custom/page-title";
import { usePostDelete } from "@/features/post";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { Post } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PostCreatePanel, PostUpdatePanel } from "./components";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Post[]>([]);
  const { mutate: deletePost } = usePostDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["post", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "post" }),
      children: () => <PostCreatePanel onCreated={() => closeSheet(id)} />,
    });

    return id;
  };

  const openDelete = (items: Post[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "post" }),
    })
      .then(() =>
        deletePost(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Post) => {
    const id = openSheet({
      children: () => (
        <PostUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "post" }),
      description: t("editText", { ns: "post" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("post", { ns: "modules" })} />
      <DataPanel
        url="/post"
        layout="table"
        id="post"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "post" }) },
        ]}
        selected={selectedItems as Post[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "post" }),
            handler: (items: Post[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "post" }),
            variant: "destructive",
            handler: (items: Post[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "post" }),
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
