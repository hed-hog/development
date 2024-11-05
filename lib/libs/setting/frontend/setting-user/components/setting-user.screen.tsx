import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { useSettingUserDelete } from "@/features/blog/setting-user";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { SettingUser } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SettingUserCreatePanel from "./components/setting-user-create-panel";
import SettingUserUpdatePanel from "./components/setting-user-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<SettingUser[]>([]);
  const { mutate: deleteSettingUser } = useSettingUserDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["setting-user", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "setting-user" }),
      children: () => (
        <SettingUserCreatePanel onCreated={() => closeSheet(id)} />
      ),
    });

    return id;
  };

  const openDelete = (items: SettingUser[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "setting-user" }),
    })
      .then(() =>
        deleteSettingUser(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: SettingUser) => {
    const id = openSheet({
      children: () => (
        <SettingUserUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "setting-user" }),
      description: t("editText", { ns: "setting-user" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("settingUser", { ns: "modules" })} />
      <DataPanel
        url="/setting-user"
        layout="table"
        id="setting-user"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "setting-user" }) },
        ]}
        selected={selectedItems as SettingUser[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "setting-user" }),
            handler: (items: SettingUser[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "setting-user" }),
            variant: "destructive",
            handler: (items: SettingUser[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "setting-user" }),
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
