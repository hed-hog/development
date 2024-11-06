import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { usePlanDelete } from "@/features/blog/plan";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { Plan } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PlanCreatePanel from "./components/plan-create-panel";
import PlanUpdatePanel from "./components/plan-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Plan[]>([]);
  const { mutate: deletePlan } = usePlanDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["plan", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "plan" }),
      children: () => <PlanCreatePanel onCreated={() => closeSheet(id)} />,
    });

    return id;
  };

  const openDelete = (items: Plan[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "plan" }),
    })
      .then(() =>
        deletePlan(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: Plan) => {
    const id = openSheet({
      children: () => (
        <PlanUpdatePanel data={item} onUpdated={() => closeSheet(id)} />
      ),
      title: t("edit", { ns: "plan" }),
      description: t("editText", { ns: "plan" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("plan", { ns: "modules" })} />
      <DataPanel
        url="/plan"
        layout="table"
        id="plan"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "plan" }) },
        ]}
        selected={selectedItems as Plan[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "plan" }),
            handler: (items: Plan[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "plan" }),
            variant: "destructive",
            handler: (items: Plan[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "plan" }),
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
