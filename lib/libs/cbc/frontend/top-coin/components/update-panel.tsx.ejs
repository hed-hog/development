import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { useTopCoinGet, useTopCoinUpdate } from "@/features/cbc/top-coin";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { TopCoin } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type TopCoinUpdatePanelProps = {
  data: TopCoin;
  onUpdated?: (data: TopCoin) => void;
};

const TopCoinUpdatePanel = forwardRef(
  ({ data, onUpdated }: TopCoinUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useTopCoinGet(data.id as number);
    const { mutate: topCoinUpdate } = useTopCoinUpdate();
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
                    topCoinUpdate({
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

TopCoinUpdatePanel.displayName = "TopCoinUpdatePanel";

export default TopCoinUpdatePanel;
