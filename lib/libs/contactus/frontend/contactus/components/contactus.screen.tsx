import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { useContactusDelete } from "@/features/blog/contactus";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { Contactus } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactusCreatePanel from "./components/contactus-create-panel";
import ContactusUpdatePanel from "./components/contactus-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Contactus[]>([]);
  const { mutate: deleteContactus } = useContactusDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["contactus", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "contactus" }),
      children: () => <ContactusCreatePanel onCreated={() => closeSheet(id)} />,
    });

    return id;
  };

  const openDelete = (items: Contactus[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "contactus" }),
    })
      .then(() =>
        deleteContactus(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Contactus) => {
    const id = openSheet({
      children: () => (
        <ContactusUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "contactus" }),
      description: t("editText", { ns: "contactus" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("contactus", { ns: "modules" })} />
      <DataPanel
        url="/contactus"
        layout="table"
        id="contactus"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "contactus" }) },
        ]}
        selected={selectedItems as Contactus[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "contactus" }),
            handler: (items: Contactus[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "contactus" }),
            variant: "destructive",
            handler: (items: Contactus[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "contactus" }),
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
