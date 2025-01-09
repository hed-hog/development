import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useTopCoinTypeGet,
  useTopCoinTypeUpdate,
} from "@/features/cbc/top-coin-type";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { TopCoinType } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type TopCoinTypeUpdatePanelProps = {
  data: TopCoinType;
  onUpdated?: (data: TopCoinType) => void;
};

const TopCoinTypeUpdatePanel = forwardRef(
  ({ data, onUpdated }: TopCoinTypeUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useTopCoinTypeGet(data.id as number);
    const { mutate: topCoinTypeUpdate } = useTopCoinTypeUpdate();
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
                    topCoinTypeUpdate({
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

TopCoinTypeUpdatePanel.displayName = "TopCoinTypeUpdatePanel";

export default TopCoinTypeUpdatePanel;
