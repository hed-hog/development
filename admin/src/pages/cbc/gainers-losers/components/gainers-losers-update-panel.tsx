import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useGainersLosersGet,
  useGainersLosersUpdate,
} from "@/features/cbc/gainers-losers";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { GainersLosers } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type GainersLosersUpdatePanelProps = {
  data: GainersLosers;
  onUpdated?: (data: GainersLosers) => void;
};

const GainersLosersUpdatePanel = forwardRef(
  ({ data, onUpdated }: GainersLosersUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useGainersLosersGet(data.id as number);
    const { mutate: gainersLosersUpdate } = useGainersLosersUpdate();
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
                    gainersLosersUpdate({
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

GainersLosersUpdatePanel.displayName = "GainersLosersUpdatePanel";

export default GainersLosersUpdatePanel;
