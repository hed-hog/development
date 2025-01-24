import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useGainerLoserGet,
  useGainerLoserUpdate,
} from "@/features/cbc/gainer-loser";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { GainerLoser } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type GainerLoserUpdatePanelProps = {
  data: GainerLoser;
  onUpdated?: (data: GainerLoser) => void;
};

const GainerLoserUpdatePanel = forwardRef(
  ({ data, onUpdated }: GainerLoserUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useGainerLoserGet(data.id as number);
    const { mutate: gainerLoserUpdate } = useGainerLoserUpdate();
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
                    gainerLoserUpdate({
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

GainerLoserUpdatePanel.displayName = "GainerLoserUpdatePanel";

export default GainerLoserUpdatePanel;
