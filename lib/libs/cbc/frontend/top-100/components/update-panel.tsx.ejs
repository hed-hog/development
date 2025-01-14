import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import { useTop100Get, useTop100Update } from "@/features/cbc/top-100";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { Top100 } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type Top100UpdatePanelProps = {
  data: Top100;
  onUpdated?: (data: Top100) => void;
};

const Top100UpdatePanel = forwardRef(
  ({ data, onUpdated }: Top100UpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useTop100Get(data.id as number);
    const { mutate: top100Update } = useTop100Update();
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
                    top100Update({
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

Top100UpdatePanel.displayName = "Top100UpdatePanel";

export default Top100UpdatePanel;
