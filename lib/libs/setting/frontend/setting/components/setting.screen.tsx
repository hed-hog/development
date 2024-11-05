import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { useSettingDelete } from "@/features/blog/setting";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { Setting } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SettingCreatePanel from "./components/setting-create-panel";
import SettingUpdatePanel from "./components/setting-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Setting[]>([]);
  const { mutate: deleteSetting } = useSettingDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["setting", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "setting" }),
      children: () => <SettingCreatePanel onCreated={() => closeSheet(id)} />,
    });

    return id;
  };

  const openDelete = (items: Setting[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "setting" }),
    })
      .then(() =>
        deleteSetting(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Setting) => {
    const id = openSheet({
      children: () => (
        <SettingUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "setting" }),
      description: t("editText", { ns: "setting" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("setting", { ns: "modules" })} />
      <DataPanel
        url="/setting"
        layout="table"
        id="setting"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "setting" }) },
        ]}
        selected={selectedItems as Setting[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "setting" }),
            handler: (items: Setting[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "setting" }),
            variant: "destructive",
            handler: (items: Setting[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "setting" }),
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
