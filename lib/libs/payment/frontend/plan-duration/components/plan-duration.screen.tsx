import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { usePlanDurationDelete } from "@/features/blog/plan-duration";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { PlanDuration } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PlanDurationCreatePanel from "./components/plan-duration-create-panel";
import PlanDurationUpdatePanel from "./components/plan-duration-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PlanDuration[]>([]);
  const { mutate: deletePlanDuration } = usePlanDurationDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["plan-duration", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "plan-duration" }),
      children: () => (
        <PlanDurationCreatePanel onCreated={() => closeSheet(id)} />
      ),
    });

    return id;
  };

  const openDelete = (items: PlanDuration[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "plan-duration" }),
    })
      .then(() =>
        deletePlanDuration(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PlanDuration) => {
    const id = openSheet({
      children: () => (
        <PlanDurationUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "plan-duration" }),
      description: t("editText", { ns: "plan-duration" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("planDuration", { ns: "modules" })} />
      <DataPanel
        url="/plan-duration"
        layout="table"
        id="plan-duration"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "plan-duration" }) },
        ]}
        selected={selectedItems as PlanDuration[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "plan-duration" }),
            handler: (items: PlanDuration[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "plan-duration" }),
            variant: "destructive",
            handler: (items: PlanDuration[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "plan-duration" }),
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
