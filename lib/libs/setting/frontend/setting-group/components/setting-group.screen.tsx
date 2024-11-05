import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { useSettingGroupDelete } from "@/features/blog/setting-group";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { SettingGroup } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SettingGroupCreatePanel from "./components/setting-group-create-panel";
import SettingGroupUpdatePanel from "./components/setting-group-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<SettingGroup[]>([]);
  const { mutate: deleteSettingGroup } = useSettingGroupDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["setting-group", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "setting-group" }),
      children: () => (
        <SettingGroupCreatePanel onCreated={() => closeSheet(id)} />
      ),
    });

    return id;
  };

  const openDelete = (items: SettingGroup[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "setting-group" }),
    })
      .then(() =>
        deleteSettingGroup(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: SettingGroup) => {
    const id = openSheet({
      children: () => (
        <SettingGroupUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "setting-group" }),
      description: t("editText", { ns: "setting-group" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("settingGroup", { ns: "modules" })} />
      <DataPanel
        url="/setting-group"
        layout="table"
        id="setting-group"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "setting-group" }) },
        ]}
        selected={selectedItems as SettingGroup[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "setting-group" }),
            handler: (items: SettingGroup[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "setting-group" }),
            variant: "destructive",
            handler: (items: SettingGroup[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "setting-group" }),
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
