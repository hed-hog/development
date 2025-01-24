import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
<<<<<<<< HEAD:admin/src/pages/cbc/altcoin-season/components/altcoin-season-update-panel.tsx
  useAltcoinSeasonGet,
  useAltcoinSeasonUpdate,
} from "@/features/cbc/altcoin-season";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { AltcoinSeason } from "@/types/models";
========
  useOrderStatusGet,
  useOrderStatusUpdate,
} from "@/features/payment/order-status";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { OrderStatus } from "@/types/models";
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/payment/frontend/order-status/components/update-panel.tsx.ejs
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

<<<<<<<< HEAD:admin/src/pages/cbc/altcoin-season/components/altcoin-season-update-panel.tsx
export type AltcoinSeasonUpdatePanelProps = {
  data: AltcoinSeason;
  onUpdated?: (data: AltcoinSeason) => void;
};

const AltcoinSeasonUpdatePanel = forwardRef(
  ({ data, onUpdated }: AltcoinSeasonUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useAltcoinSeasonGet(data.id as number);
    const { mutate: altcoinSeasonUpdate } = useAltcoinSeasonUpdate();
========
export type OrderStatusUpdatePanelProps = {
  data: OrderStatus;
  onUpdated?: (data: OrderStatus) => void;
};

const OrderStatusUpdatePanel = forwardRef(
  ({ data, onUpdated }: OrderStatusUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useOrderStatusGet(data.id as number);
    const { mutate: orderStatusUpdate } = useOrderStatusUpdate();
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/payment/frontend/order-status/components/update-panel.tsx.ejs
    const formRef = useRef<FormPanelRef>(null);

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
                  fields={[...getFieldsLocale([{ name: "name" }], item)]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
<<<<<<<< HEAD:admin/src/pages/cbc/altcoin-season/components/altcoin-season-update-panel.tsx
                    altcoinSeasonUpdate({
========
                    orderStatusUpdate({
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/payment/frontend/order-status/components/update-panel.tsx.ejs
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

<<<<<<<< HEAD:admin/src/pages/cbc/altcoin-season/components/altcoin-season-update-panel.tsx
AltcoinSeasonUpdatePanel.displayName = "AltcoinSeasonUpdatePanel";

export default AltcoinSeasonUpdatePanel;
========
OrderStatusUpdatePanel.displayName = "OrderStatusUpdatePanel";

export default OrderStatusUpdatePanel;
>>>>>>>> 50c5a03d428dc939c5a678ea0cd821d0075e3bd4:lib/libs/payment/frontend/order-status/components/update-panel.tsx.ejs
