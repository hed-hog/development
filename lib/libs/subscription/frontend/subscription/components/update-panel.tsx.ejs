import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useSubscriptionGet,
  useSubscriptionUpdate,
} from "@/features/subscription/subscription";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Subscription } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { SubscriptionPlanGateway } from "@/types/models/SubscriptionPlanGateway.ts";
import { useSubscriptionPlanGatewayDelete } from "@/features/subscription/subscription-plan-gateway";
import SubscriptionPlanGatewayCreatePanel from "@/pages/subscription/subscription-plan-gateway/components/subscription-plan-gateway-create-panel";
import SubscriptionPlanGatewayUpdatePanel from "@/pages/subscription/subscription-plan-gateway/components/subscription-plan-gateway-update-panel";
import { SubscriptionValue } from "@/types/models/SubscriptionValue.ts";
import { useSubscriptionValueDelete } from "@/features/subscription/subscription-value";
import SubscriptionValueCreatePanel from "@/pages/subscription/subscription-value/components/subscription-value-create-panel";
import SubscriptionValueUpdatePanel from "@/pages/subscription/subscription-value/components/subscription-value-update-panel";
import { SubscriptionPerson } from "@/types/models/SubscriptionPerson.ts";
import { useSubscriptionPersonDelete } from "@/features/subscription/subscription-person";
import SubscriptionPersonCreatePanel from "@/pages/subscription/subscription-person/components/subscription-person-create-panel";
import SubscriptionPersonUpdatePanel from "@/pages/subscription/subscription-person/components/subscription-person-update-panel";
import { SubscriptionPayment } from "@/types/models/SubscriptionPayment.ts";
import { useSubscriptionPaymentDelete } from "@/features/subscription/subscription-payment";
import SubscriptionPaymentCreatePanel from "@/pages/subscription/subscription-payment/components/subscription-payment-create-panel";
import SubscriptionPaymentUpdatePanel from "@/pages/subscription/subscription-payment/components/subscription-payment-update-panel";

export type SubscriptionUpdatePanelProps = {
  data: Subscription;
  onUpdated?: (data: Subscription) => void;
};

const SubscriptionUpdatePanel = forwardRef(
  ({ data, onUpdated }: SubscriptionUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useSubscriptionGet(data.id as number);
    const { mutate: subscriptionUpdate } = useSubscriptionUpdate();
    const formRef = useRef<FormPanelRef>(null);

    const { openDialog, confirm, closeDialog } = useApp();
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const subscriptionPlanGatewayRef = useRef<any>(null);
    const { mutate: subscriptionPlanGatewayDelete } =
      useSubscriptionPlanGatewayDelete();
    const openCreateSubscriptionPlanGateway = () => {
      const id = openDialog({
        title: t("create", { ns: "subscription.subscription-plan-gateway" }),
        description: t("createText", {
          ns: "subscription.subscription-plan-gateway",
        }),
        children: () => (
          <SubscriptionPlanGatewayCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      });

      return id;
    };
    const openUpdateSubscriptionPlanGateway = (
      itemSubscriptionPlanGateway: SubscriptionPlanGateway,
    ) => {
      const id = openDialog({
        children: () => (
          <SubscriptionPlanGatewayUpdatePanel
            id={Number(item?.id)}
            data={itemSubscriptionPlanGateway}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "subscription.subscription-plan-gateway" }),
        description: t("editText", {
          ns: "subscription.subscription-plan-gateway",
        }),
      });

      return id;
    };
    const openDeleteSubscriptionPlanGateway = (
      items: SubscriptionPlanGateway[],
    ) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", {
          ns: "subscription.subscription-plan-gateway",
        }),
      })
        .then(() =>
          subscriptionPlanGatewayDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          }),
        )
        .catch(() => setSelectedItems(items));
    };
    const subscriptionValueRef = useRef<any>(null);
    const { mutate: subscriptionValueDelete } = useSubscriptionValueDelete();
    const openCreateSubscriptionValue = () => {
      const id = openDialog({
        title: t("create", { ns: "subscription.subscription-value" }),
        description: t("createText", { ns: "subscription.subscription-value" }),
        children: () => (
          <SubscriptionValueCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      });

      return id;
    };
    const openUpdateSubscriptionValue = (
      itemSubscriptionValue: SubscriptionValue,
    ) => {
      const id = openDialog({
        children: () => (
          <SubscriptionValueUpdatePanel
            id={Number(item?.id)}
            data={itemSubscriptionValue}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "subscription.subscription-value" }),
        description: t("editText", { ns: "subscription.subscription-value" }),
      });

      return id;
    };
    const openDeleteSubscriptionValue = (items: SubscriptionValue[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "subscription.subscription-value" }),
      })
        .then(() =>
          subscriptionValueDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          }),
        )
        .catch(() => setSelectedItems(items));
    };
    const subscriptionPersonRef = useRef<any>(null);
    const { mutate: subscriptionPersonDelete } = useSubscriptionPersonDelete();
    const openCreateSubscriptionPerson = () => {
      const id = openDialog({
        title: t("create", { ns: "subscription.subscription-person" }),
        description: t("createText", {
          ns: "subscription.subscription-person",
        }),
        children: () => (
          <SubscriptionPersonCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      });

      return id;
    };
    const openUpdateSubscriptionPerson = (
      itemSubscriptionPerson: SubscriptionPerson,
    ) => {
      const id = openDialog({
        children: () => (
          <SubscriptionPersonUpdatePanel
            id={Number(item?.id)}
            data={itemSubscriptionPerson}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "subscription.subscription-person" }),
        description: t("editText", { ns: "subscription.subscription-person" }),
      });

      return id;
    };
    const openDeleteSubscriptionPerson = (items: SubscriptionPerson[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", {
          ns: "subscription.subscription-person",
        }),
      })
        .then(() =>
          subscriptionPersonDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          }),
        )
        .catch(() => setSelectedItems(items));
    };
    const subscriptionPaymentRef = useRef<any>(null);
    const { mutate: subscriptionPaymentDelete } =
      useSubscriptionPaymentDelete();
    const openCreateSubscriptionPayment = () => {
      const id = openDialog({
        title: t("create", { ns: "subscription.subscription-payment" }),
        description: t("createText", {
          ns: "subscription.subscription-payment",
        }),
        children: () => (
          <SubscriptionPaymentCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      });

      return id;
    };
    const openUpdateSubscriptionPayment = (
      itemSubscriptionPayment: SubscriptionPayment,
    ) => {
      const id = openDialog({
        children: () => (
          <SubscriptionPaymentUpdatePanel
            id={Number(item?.id)}
            data={itemSubscriptionPayment}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "subscription.subscription-payment" }),
        description: t("editText", { ns: "subscription.subscription-payment" }),
      });

      return id;
    };
    const openDeleteSubscriptionPayment = (items: SubscriptionPayment[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", {
          ns: "subscription.subscription-payment",
        }),
      })
        .then(() =>
          subscriptionPaymentDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          }),
        )
        .catch(() => setSelectedItems(items));
    };

    useEffectAfterFirstUpdate(() => {
      if (item && formRef.current) {
        formRef.current.setValuesFromItem(item);
      }
    }, [item]);

    useImperativeHandle(ref, () => ({}));

    return (
      <TabPanel
        activeTabIndex={0}
        tabs={[
          {
            title: t("details", { ns: "actions" }),
            children: (
              <Overlay loading={isLoading}>
                <FormPanel
                  ref={formRef}
                  fields={[]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    subscriptionUpdate({
                      id: data.id,
                      data,
                    });
                    if (typeof onUpdated === "function") {
                      onUpdated(data);
                    }
                  }}
                />
              </Overlay>
            ),
          },
        ]}
      />
    );
  },
);

SubscriptionUpdatePanel.displayName = "SubscriptionUpdatePanel";

export default SubscriptionUpdatePanel;
