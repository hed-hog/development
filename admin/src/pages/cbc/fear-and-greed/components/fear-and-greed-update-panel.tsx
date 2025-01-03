import FormPanel, { FormPanelRef } from "@/components/panels/form-panel";
import { Overlay } from "@/components/custom/overlay";
import { TabPanel } from "@/components/panels/tab-panel";
import {
  useFearAndGreedGet,
  useFearAndGreedUpdate,
} from "@/features/cbc/fear-and-greed";
import useEffectAfterFirstUpdate from "@/hooks/use-effect-after-first-update";
import { FearAndGreed } from "@/types/models";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export type FearAndGreedUpdatePanelProps = {
  data: FearAndGreed;
  onUpdated?: (data: FearAndGreed) => void;
};

const FearAndGreedUpdatePanel = forwardRef(
  ({ data, onUpdated }: FearAndGreedUpdatePanelProps, ref) => {
    const { t } = useTranslation(["actions", "fields", "translations"]);
    const { data: item, isLoading } = useFearAndGreedGet(data.id as number);
    const { mutate: fearAndGreedUpdate } = useFearAndGreedUpdate();
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
                    fearAndGreedUpdate({
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

FearAndGreedUpdatePanel.displayName = "FearAndGreedUpdatePanel";

export default FearAndGreedUpdatePanel;
