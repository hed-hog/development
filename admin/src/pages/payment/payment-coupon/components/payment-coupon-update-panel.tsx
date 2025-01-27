import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  usePaymentCouponGet,
  usePaymentCouponUpdate,
} from "@/features/payment/payment-coupon";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { PaymentCoupon } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

import { useApp } from "@/hooks/use-app";
import { isPlural } from "@/lib/utils";
import { PaymentItem } from "@/types/models/PaymentItem.ts";
import { usePaymentItemDelete } from "@/features/payment/payment-item";
import PaymentItemCreatePanel from "@/pages/payment/payment-item/components/payment-item-create-panel";
import PaymentItemUpdatePanel from "@/pages/payment/payment-item/components/payment-item-update-panel";
import { PaymentValue } from "@/types/models/PaymentValue.ts";
import { usePaymentValueDelete } from "@/features/payment/payment-value";
import PaymentValueCreatePanel from "@/pages/payment/payment-value/components/payment-value-create-panel";
import PaymentValueUpdatePanel from "@/pages/payment/payment-value/components/payment-value-update-panel";
import { PaymentNotification } from "@/types/models/PaymentNotification.ts";
import { usePaymentNotificationDelete } from "@/features/payment/payment-notification";
import PaymentNotificationCreatePanel from "@/pages/payment/payment-notification/components/payment-notification-create-panel";
import PaymentNotificationUpdatePanel from "@/pages/payment/payment-notification/components/payment-notification-update-panel";
import { PaymentCouponItem } from "@/types/models/PaymentCouponItem.ts";
import { usePaymentCouponItemDelete } from "@/features/payment/payment-coupon-item";
import PaymentCouponItemCreatePanel from "@/pages/payment/payment-coupon-item/components/payment-coupon-item-create-panel";
import PaymentCouponItemUpdatePanel from "@/pages/payment/payment-coupon-item/components/payment-coupon-item-update-panel";

export type PaymentCouponUpdatePanelProps = {
  data: PaymentCoupon;
  onUpdated?: (data: PaymentCoupon) => void;
};

const PaymentCouponUpdatePanel = forwardRef(
  ({ data, onUpdated }: PaymentCouponUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = usePaymentCouponGet(data.id as number);
    const { mutate: paymentCouponUpdate } = usePaymentCouponUpdate();
    const formRef = useRef<FormPanelRef>(null);

    const { openDialog, confirm, closeDialog } = useApp();
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const paymentItemRef = useRef<any>(null);
    const { mutate: paymentItemDelete } = usePaymentItemDelete();
    const openCreatePaymentItem = () => {
      const id = openDialog({
        title: t("create", { ns: "payment.payment-item" }),
        description: t("createText", { ns: "payment.payment-item" }),
        children: () => (
          <PaymentItemCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      });

      return id;
    };
    const openUpdatePaymentItem = (itemPaymentItem: PaymentItem) => {
      const id = openDialog({
        children: () => (
          <PaymentItemUpdatePanel
            id={Number(item?.id)}
            data={itemPaymentItem}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "payment.payment-item" }),
        description: t("editText", { ns: "payment.payment-item" }),
      });

      return id;
    };
    const openDeletePaymentItem = (items: PaymentItem[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "payment.payment-item" }),
      })
        .then(() =>
          paymentItemDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          }),
        )
        .catch(() => setSelectedItems(items));
    };
    const paymentValueRef = useRef<any>(null);
    const { mutate: paymentValueDelete } = usePaymentValueDelete();
    const openCreatePaymentValue = () => {
      const id = openDialog({
        title: t("create", { ns: "payment.payment-value" }),
        description: t("createText", { ns: "payment.payment-value" }),
        children: () => (
          <PaymentValueCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      });

      return id;
    };
    const openUpdatePaymentValue = (itemPaymentValue: PaymentValue) => {
      const id = openDialog({
        children: () => (
          <PaymentValueUpdatePanel
            id={Number(item?.id)}
            data={itemPaymentValue}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "payment.payment-value" }),
        description: t("editText", { ns: "payment.payment-value" }),
      });

      return id;
    };
    const openDeletePaymentValue = (items: PaymentValue[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "payment.payment-value" }),
      })
        .then(() =>
          paymentValueDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          }),
        )
        .catch(() => setSelectedItems(items));
    };
    const paymentNotificationRef = useRef<any>(null);
    const { mutate: paymentNotificationDelete } =
      usePaymentNotificationDelete();
    const openCreatePaymentNotification = () => {
      const id = openDialog({
        title: t("create", { ns: "payment.payment-notification" }),
        description: t("createText", { ns: "payment.payment-notification" }),
        children: () => (
          <PaymentNotificationCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      });

      return id;
    };
    const openUpdatePaymentNotification = (
      itemPaymentNotification: PaymentNotification,
    ) => {
      const id = openDialog({
        children: () => (
          <PaymentNotificationUpdatePanel
            id={Number(item?.id)}
            data={itemPaymentNotification}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "payment.payment-notification" }),
        description: t("editText", { ns: "payment.payment-notification" }),
      });

      return id;
    };
    const openDeletePaymentNotification = (items: PaymentNotification[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "payment.payment-notification" }),
      })
        .then(() =>
          paymentNotificationDelete({
            id: Number(data.id),
            ids: items.map((item) => item.id).filter((id) => id !== undefined),
          }),
        )
        .catch(() => setSelectedItems(items));
    };
    const paymentCouponItemRef = useRef<any>(null);
    const { mutate: paymentCouponItemDelete } = usePaymentCouponItemDelete();
    const openCreatePaymentCouponItem = () => {
      const id = openDialog({
        title: t("create", { ns: "payment.payment-coupon-item" }),
        description: t("createText", { ns: "payment.payment-coupon-item" }),
        children: () => (
          <PaymentCouponItemCreatePanel
            id={Number(data.id)}
            onCreated={() => closeDialog(id)}
          />
        ),
      });

      return id;
    };
    const openUpdatePaymentCouponItem = (
      itemPaymentCouponItem: PaymentCouponItem,
    ) => {
      const id = openDialog({
        children: () => (
          <PaymentCouponItemUpdatePanel
            id={Number(item?.id)}
            data={itemPaymentCouponItem}
            onUpdated={() => closeDialog(id)}
          />
        ),
        title: t("edit", { ns: "payment.payment-coupon-item" }),
        description: t("editText", { ns: "payment.payment-coupon-item" }),
      });

      return id;
    };
    const openDeletePaymentCouponItem = (items: PaymentCouponItem[]) => {
      return confirm({
        title: `${t("delete", { ns: "actions" })} ${items.length} ${isPlural(items.length) ? t("items", { ns: "actions" }) : t("item", { ns: "actions" })}`,
        description: t("deleteText", { ns: "payment.payment-coupon-item" }),
      })
        .then(() =>
          paymentCouponItemDelete({
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
                    paymentCouponUpdate({
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

PaymentCouponUpdatePanel.displayName = "PaymentCouponUpdatePanel";

export default PaymentCouponUpdatePanel;
