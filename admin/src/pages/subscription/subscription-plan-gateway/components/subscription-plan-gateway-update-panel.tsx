import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useSubscriptionPlanGatewayGet,
  useSubscriptionPlanGatewayUpdate,
} from "@/features/subscription/subscription-plan-gateway";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { SubscriptionPlanGateway } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type SubscriptionPlanGatewayUpdatePanelProps = {
  id: number;
  data: SubscriptionPlanGateway;
  onUpdated?: (data: SubscriptionPlanGateway) => void;
};

const SubscriptionPlanGatewayUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: SubscriptionPlanGatewayUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useSubscriptionPlanGatewayGet(
      id,
      data.id as number,
    );
    const { mutate: subscriptionPlanGatewayUpdate } =
      useSubscriptionPlanGatewayUpdate();
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
                    subscriptionPlanGatewayUpdate({
                      planId: id,
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

SubscriptionPlanGatewayUpdatePanel.displayName =
  "SubscriptionPlanGatewayUpdatePanel";

export default SubscriptionPlanGatewayUpdatePanel;
