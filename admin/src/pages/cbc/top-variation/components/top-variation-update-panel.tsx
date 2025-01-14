import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useTopVariationGet,
  useTopVariationUpdate,
} from "@/features/cbc/top-variation";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { TopVariation } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type TopVariationUpdatePanelProps = {
  data: TopVariation;
  onUpdated?: (data: TopVariation) => void;
};

const TopVariationUpdatePanel = forwardRef(
  ({ data, onUpdated }: TopVariationUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useTopVariationGet(data.id as number);
    const { mutate: topVariationUpdate } = useTopVariationUpdate();
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
                    topVariationUpdate({
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

TopVariationUpdatePanel.displayName = "TopVariationUpdatePanel";

export default TopVariationUpdatePanel;
