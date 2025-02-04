import FormPanel, {
  FormPanelRef,
  getFieldsLocale,
} from "@/components/panels/form-panel";
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
