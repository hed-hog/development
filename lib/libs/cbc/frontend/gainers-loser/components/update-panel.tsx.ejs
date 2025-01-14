import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useGainersLoserGet,
  useGainersLoserUpdate,
} from "@/features/cbc/gainers-loser";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { GainersLoser } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type GainersLoserUpdatePanelProps = {
  data: GainersLoser;
  onUpdated?: (data: GainersLoser) => void;
};

const GainersLoserUpdatePanel = forwardRef(
  ({ data, onUpdated }: GainersLoserUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useGainersLoserGet(data.id as number);
    const { mutate: gainersLoserUpdate } = useGainersLoserUpdate();
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
                    gainersLoserUpdate({
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

GainersLoserUpdatePanel.displayName = "GainersLoserUpdatePanel";

export default GainersLoserUpdatePanel;
