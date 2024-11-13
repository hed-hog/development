import { PageTitle } from "@/components/custom/page-title";
import DataPanel from "@/components/panels/data-panel";
import { usePaymentGatewayDelete } from "@/features/blog/payment-gateway";
import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { PaymentGateway } from "@/types/models";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PaymentGatewayCreatePanel from "./components/payment-gateway-create-panel";
import PaymentGatewayUpdatePanel from "./components/payment-gateway-update-panel";

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<PaymentGateway[]>([]);
  const { mutate: deletePaymentGateway } = usePaymentGatewayDelete();
  const { openSheet, confirm, closeSheet } = useApp();
  const { t } = useTranslation(["payment-gateway", "modules", "actions"]);

  const openCreate = () => {
    const id = openSheet({
      title: t("create", { ns: "actions" }),
      description: t("createText", { ns: "payment-gateway" }),
      children: () => (
        <PaymentGatewayCreatePanel onCreated={() => closeSheet(id)} />
      ),
    });

    return id;
  };

  const openDelete = (items: PaymentGateway[]) => {
    return confirm({
      title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
      description: t("deleteText", { ns: "payment-gateway" }),
    })
      .then(() =>
        deletePaymentGateway(
          items.map((item) => item.id).filter((id) => id !== undefined),
        ),
      )
      .catch(() => setSelectedItems(items));
  };

  const openUpdate = (item: PaymentGateway) => {
    const id = openSheet({
      children: () => (
        <PaymentGatewayUpdatePanel
          data={item}
          onUpdated={() => closeSheet(id)}
        />
      ),
      title: t("edit", { ns: "payment-gateway" }),
      description: t("editText", { ns: "payment-gateway" }),
    });

    return id;
  };

  return (
    <>
      <PageTitle title={t("paymentGateway", { ns: "modules" })} />
      <DataPanel
        url="/payment-gateway"
        layout="table"
        id="payment-gateway"
        selectable
        columns={[
          { key: "id", header: "ID", width: 64 },
          { key: "name", header: t("name", { ns: "payment-gateway" }) },
        ]}
        selected={selectedItems as PaymentGateway[]}
        multiple
        hasSearch
        sortable
        onItemDoubleClick={(item) => openUpdate(item)}
        menuActions={[
          {
            icon: <IconEdit className="mr-1 w-8 cursor-pointer" />,
            label: t("edit", { ns: "actions" }),
            tooltip: t("editTooltip", { ns: "payment-gateway" }),
            handler: (items: PaymentGateway[]) => {
              if (items.length === 1) openUpdate(items[0]);
            },
            show: "once",
          },
          {
            icon: <IconTrash className="mr-1 w-8 cursor-pointer" />,
            label: t("delete", { ns: "actions" }),
            tooltip: t("deleteTooltip", { ns: "payment-gateway" }),
            variant: "destructive",
            handler: (items: PaymentGateway[]) => {
              openDelete(items);
            },
            show: "some",
          },
          {
            icon: <IconPlus className="mr-1 w-8 cursor-pointer" />,
            label: t("create", { ns: "actions" }),
            tooltip: t("createTooltip", { ns: "payment-gateway" }),
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
