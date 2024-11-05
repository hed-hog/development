import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { useLocaleDelete } from "@/features/blog/locale";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { Locale } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LocaleCreatePanel from "./components/locale-create-panel";
import LocaleUpdatePanel from "./components/locale-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Locale[]>([]);
  const { mutate: deleteLocale } = useLocaleDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["locale", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "locale" }),
      children: () => <LocaleCreatePanel onCreated={() => closeSheet(id)} />,
    });

    return id;
  };

  const openDelete = (items: Locale[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "locale" }),
    })
      .then(() =>
        deleteLocale(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Locale) => {
    const id = openSheet({
      children: () => (
        <LocaleUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "locale" }),
      description: t("editText", { ns: "locale" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("locale", { ns: "modules" })} />
      <DataPanel
        url="/locale"
        layout="table"
        id="locale"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "locale" }) },
        ]}
        selected={selectedItems as Locale[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "locale" }),
            handler: (items: Locale[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "locale" }),
            variant: "destructive",
            handler: (items: Locale[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "locale" }),
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
