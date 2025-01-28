import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useAltcoinSeasonGet,
  useAltcoinSeasonUpdate,
} from "@/features/cbc/altcoin-season";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { AltcoinSeason } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type AltcoinSeasonUpdatePanelProps = {
  data: AltcoinSeason;
  onUpdated?: (data: AltcoinSeason) => void;
};

const AltcoinSeasonUpdatePanel = forwardRef(
  ({ data, onUpdated }: AltcoinSeasonUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useAltcoinSeasonGet(data.id as number);
    const { mutate: altcoinSeasonUpdate } = useAltcoinSeasonUpdate();
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
                    altcoinSeasonUpdate({
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

AltcoinSeasonUpdatePanel.displayName = "AltcoinSeasonUpdatePanel";

export default AltcoinSeasonUpdatePanel;
