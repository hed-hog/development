import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { usePersonDocumentTypeDelete } from "@/features/contact/person-document-type";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { PersonDocumentType } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PersonDocumentTypeCreatePanel from "./components/person-document-type-create-panel";
import PersonDocumentTypeUpdatePanel from "./components/person-document-type-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PersonDocumentType[]>([]);
  const { mutate: deletePersonDocumentType } = usePersonDocumentTypeDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["person-document-type", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "person-document-type" }),
      children: () => (
        <PersonDocumentTypeCreatePanel onCreated={() => closeSheet(id)} />
      ),
    });

    return id;
  };

  const openDelete = (items: PersonDocumentType[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "person-document-type" }),
    })
      .then(() =>
        deletePersonDocumentType(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PersonDocumentType) => {
    const id = openSheet({
      children: () => (
        <PersonDocumentTypeUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t("edit", { ns: "person-document-type" }),
      description: t("editText", { ns: "person-document-type" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("personDocumentType", { ns: "modules" })} />
      <DataPanel
        url="/person-document-type"
        layout="table"
        id="person-document-type"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "person-document-type" }) },
        ]}
        selected={selectedItems as PersonDocumentType[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "person-document-type" }),
            handler: (items: PersonDocumentType[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "person-document-type" }),
            variant: "destructive",
            handler: (items: PersonDocumentType[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "person-document-type" }),
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
