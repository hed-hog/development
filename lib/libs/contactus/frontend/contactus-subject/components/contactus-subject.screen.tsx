import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { useContactusSubjectDelete } from "@/features/blog/contactus-subject";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { ContactusSubject } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactusSubjectCreatePanel from "./components/contactus-subject-create-panel";
import ContactusSubjectUpdatePanel from "./components/contactus-subject-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<ContactusSubject[]>([]);
  const { mutate: deleteContactusSubject } = useContactusSubjectDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["contactus-subject", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "contactus-subject" }),
      children: () => (
        <ContactusSubjectCreatePanel onCreated={() => closeSheet(id)} />
      ),
    });

    return id;
  };

  const openDelete = (items: ContactusSubject[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "contactus-subject" }),
    })
      .then(() =>
        deleteContactusSubject(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: ContactusSubject) => {
    const id = openSheet({
      children: () => (
        <ContactusSubjectUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t("edit", { ns: "contactus-subject" }),
      description: t("editText", { ns: "contactus-subject" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("contactusSubject", { ns: "modules" })} />
      <DataPanel
        url="/contactus-subject"
        layout="table"
        id="contactus-subject"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "contactus-subject" }) },
        ]}
        selected={selectedItems as ContactusSubject[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "contactus-subject" }),
            handler: (items: ContactusSubject[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "contactus-subject" }),
            variant: "destructive",
            handler: (items: ContactusSubject[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "contactus-subject" }),
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
