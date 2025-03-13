import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useSubscriptionPersonGet,
  useSubscriptionPersonUpdate,
} from "@/features/subscription/subscription-person";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { SubscriptionPerson } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type SubscriptionPersonUpdatePanelProps = {
  id: number;
  data: SubscriptionPerson;
  onUpdated?: (data: SubscriptionPerson) => void;
};

const SubscriptionPersonUpdatePanel = forwardRef(
  ({ id, data, onUpdated }: SubscriptionPersonUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useSubscriptionPersonGet(
      id,
      data.id as number,
    );
    const { mutate: subscriptionPersonUpdate } = useSubscriptionPersonUpdate();
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
                    subscriptionPersonUpdate({
                      subscriptionId: id,
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

SubscriptionPersonUpdatePanel.displayName = "SubscriptionPersonUpdatePanel";

export default SubscriptionPersonUpdatePanel;
