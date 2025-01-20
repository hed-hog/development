import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { useTopCmcGet, useTopCmcUpdate } from "@/features/cbc/top-cmc";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { TopCmc } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type TopCmcUpdatePanelProps = {
  data: TopCmc;
  onUpdated?: (data: TopCmc) => void;
};

const TopCmcUpdatePanel = forwardRef(
  ({ data, onUpdated }: TopCmcUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useTopCmcGet(data.id as number);
    const { mutate: topCmcUpdate } = useTopCmcUpdate();
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
                    topCmcUpdate({
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

TopCmcUpdatePanel.displayName = "TopCmcUpdatePanel";

export default TopCmcUpdatePanel;
