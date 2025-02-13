import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useSubscriptionPlanItemGet,
  useSubscriptionPlanItemUpdate,
} from "@/features/subscription/subscription-plan-item";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { SubscriptionPlanItem } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type SubscriptionPlanItemUpdatePanelProps = {
  data: SubscriptionPlanItem;
  onUpdated?: (data: SubscriptionPlanItem) => void;
};

const SubscriptionPlanItemUpdatePanel = forwardRef(
  ({ data, onUpdated }: SubscriptionPlanItemUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useSubscriptionPlanItemGet(
      data.id as number,
    );
    const { mutate: subscriptionPlanItemUpdate } =
      useSubscriptionPlanItemUpdate();
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
                  fields={[]}
                  button={{ text: t("save", { ns: "actions" }) }}
                  onSubmit={(data) => {
                    subscriptionPlanItemUpdate({
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

SubscriptionPlanItemUpdatePanel.displayName = "SubscriptionPlanItemUpdatePanel";

export default SubscriptionPlanItemUpdatePanel;
